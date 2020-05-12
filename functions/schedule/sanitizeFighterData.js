const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const fighterQualityRules = require('./fighterQualityRules');
const {
  assessDataQuality,
  loadOldestRecords,
  prioritiseLegacyRecords
} = require('./sanitizeCommon');

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

// Update Data Quality Scores
module.exports = (batchSize, app = admin) => loadOldestRecords('fighters', batchSize, app)
  // If we have legacy records then make these the priority
  .then(prioritiseLegacyRecords)
  // Clean and Sanitise Data
  .then(fighters => fighters.map(sanitiseFighterRecord))
  // Do the Data quality assessment
  .then(fighters => Promise.all(fighters.map(assessDataQuality(fighterQualityRules, app))))
  // Store the results
  .then(fighters => updateFighter(fighters, app));
