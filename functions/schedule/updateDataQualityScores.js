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

  console.log('Found', fighters.length, 'fighters.');
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
      lastQualityAssessment: now,
      modified: now
    })
  });

  return updated;
};

const updateSearchableFields = fighter => {
  const { name } = fighter;

  const searchable = {
    searchableName: name.toLowerCase()
  };

  return Object.assign(fighter, searchable);
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

// Update Data Quality Scores
module.exports = (batchSize, app = admin) => loadOldestRecords(batchSize, app)
  // If we have legacy records then make these the priority
  .then(results => {
    const legacyRecords = results[1].filter(f => !f._meta.lastQualityAssessment);
    return legacyRecords.length ? legacyRecords : results[0];
  })
  // Do the Data quality assessment
  .then(fighters => Promise.all(fighters.map(assessDataQuality(app))))
  // Update searchable fields
  .then(fighters => fighters.map(updateSearchableFields))
  // Store the results
  .then(fighters => updateFighter(fighters, app))
  .then(console.log)
  .catch(console.error);
