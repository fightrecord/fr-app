const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const dataQualityRules = require('./dataQualityRules');

const delay = ms => new Promise(resolve => {
  setTimeout(() => resolve(), ms);
});

const processSnapshot = snapshot => {
  console.log('Processing snapshot', snapshot.docs.length, 'docs.');
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

const assessDataQuality = fighter => {
  const { _id, _meta } = fighter;
  console.log('Computing data quality score for fighter', _id);

  const now = DateTime.utc().toISO();
  const quality = dataQualityRules.reduce(({ score, actions }, rule) => {
    const [ruleScore, ruleActions] = rule(fighter);
    return {
      score: score + ruleScore,
      actions: [...actions, ...ruleActions]
    };
  }, { score: 0, actions: [] });

  const updated = Object.assign(fighter, {
    _quality: quality,
    _meta: Object.assign(_meta, {
      lastQualityAssessment: now,
      modified: now
    })
  });

  console.log('Fighter', _id, 'scores', quality.score);
  return updated;
};

const updateFighter = (arr, app = admin) => new Promise(resolve => {
  if (arr.length < 1) {
    resolve(['Done']);
  }

  const fighter = arr[0];
  const { _id } = fighter;
  console.log('Storing updated record for fighter', _id);

  app.firestore()
    .collection('fighters')
    .doc(_id)
    .set(fighter)
    .then(() => delay(20))
    .then(() => updateFighter(arr.slice(1), app))
    .then(result => resolve([...result, 'Updated ' + _id]))
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
  .then(fighters => fighters.map(assessDataQuality))
  // Store the results
  .then(fighters => updateFighter(fighters, app))
  .then(console.log)
  .catch(console.error);
