const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const eventQualityRules = require('./eventQualityRules');
const {
  assessDataQuality,
  loadOldestRecords,
  prioritiseLegacyRecords
} = require('./sanitizeCommon');

const sanitiseEventRecord = event => {
  const { _meta, name } = event;
  const now = DateTime.utc();

  const updated = {
    _meta: Object.assign(_meta, {
      lastCleaned: now.toISO()
    }),
    searchableName: name.toLowerCase()
  };

  delete updated._meta.lastQualityAssessment;

  return JSON.parse(
    JSON.stringify(
      Object.assign(event, updated)));
};

const updateEvent = (arr, app = admin) => new Promise(resolve => {
  if (arr.length < 1) {
    resolve(['Done']);
  }

  const event = arr[0];
  const { _id, _quality: { score } } = event;

  app.firestore()
    .collection('events')
    .doc(_id)
    .set(event)
    .then(() => updateEvent(arr.slice(1), app))
    .then(result => resolve([...result, `Updated event ${_id}, score=${score}`]))
    .catch(console.error);
});

// Update Data Quality Scores
module.exports = (batchSize, app = admin) => loadOldestRecords('events', batchSize, app)
  // If we have legacy records then make these the priority
  .then(prioritiseLegacyRecords)
  // Clean and Sanitise Data
  .then(events => events.map(sanitiseEventRecord))
  // Do the Data quality assessment
  .then(events => Promise.all(events.map(assessDataQuality(eventQualityRules, app))))
  // Store the results
  .then(events => updateEvent(events, app));
