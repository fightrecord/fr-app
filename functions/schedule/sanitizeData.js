const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const dataQualityRules = require('./dataQualityRules');

const processSnapshot = snapshot => {
  const fighters = [];

  snapshot.docs.forEach(doc => {
    fighters.push(Object.assign(
      doc.data(),
      { _id: doc.id }
    ));
  });

  return fighters;
};

const assessDataQuality = app => async fighter => {
  const { _id, _meta } = fighter;

  const now = DateTime.utc().toISO();
  const results = await Promise.all(dataQualityRules.map(rule => rule(fighter, app)));

  const quality = results.reduce((
    { score, actions, amends },
    [ruleScore, ruleActions, ruleAmends]
  ) => ({
    score: score + ruleScore,
    actions: [...actions, ...ruleActions],
    amends: Object.assign(amends, ruleAmends)
  }), { score: 0, actions: [], amends: {} });

  const { score, actions, amends } = quality;
  const updated = Object.assign(fighter, amends, {
    _quality: { score, actions },
    _meta: Object.assign(_meta, {
      lastQuality: now,
      modified: now
    })
  });

  return updated;
};

const sanitiseFighterRecord = fighter => {
  const { _meta, name, record = [] } = fighter;
  const now = DateTime.utc();

  const updated = {
    _meta: Object.assign(_meta, {
      lastCleaned: now.toISO()
    }),
    record: record.filter(({ won = 0, lost = 0, draw = 0 }) => won + lost + draw > 0),
    searchableName: name.toLowerCase()
  };

  delete updated._meta.lastQualityAssessment;

  return JSON.parse(
    JSON.stringify(
      Object.assign(fighter, updated)));
};

const updateFighter = (arr, app = admin) => new Promise(resolve => {
  if (arr.length < 1) {
    resolve(['Done']);
  }

  const fighter = arr[0];
  const { _id, _quality: { score } } = fighter;

  app.firestore()
    .collection('fighters')
    .doc(_id)
    .set(fighter)
    .then(() => updateFighter(arr.slice(1), app))
    .then(result => resolve([...result, `Updated fighter ${_id}, score=${score}`]))
    .catch(console.error);
});

const loadOldestRecords = (batchSize, app = admin) => {
  const fightersRef = app.firestore()
    .collection('fighters');

  const orderBy = ['_meta.lastQualityAssessment', '_meta.modified'];

  return Promise
    .all(orderBy
      .map(orderBy => fightersRef
        .orderBy(orderBy, 'asc')
        .limit(batchSize)
        .get()
        .then(processSnapshot)));
};

const prioritiseLegacyRecords = results => {
  const legacyRecords = results[1].filter(f => !f._meta.lastQualityAssessment);
  const fighters = legacyRecords.length ? legacyRecords : results[0];

  console.log('Found', fighters.length, 'fighters.');
  return fighters;
};

// Update Data Quality Scores
module.exports = (batchSize, app = admin) => loadOldestRecords(batchSize, app)
  // If we have legacy records then make these the priority
  .then(prioritiseLegacyRecords)
  // Clean and Sanitise Data
  .then(fighters => fighters.map(sanitiseFighterRecord))
  // Do the Data quality assessment
  .then(fighters => Promise.all(fighters.map(assessDataQuality(app))))
  // Store the results
  .then(fighters => updateFighter(fighters, app))
  .then(console.log);
