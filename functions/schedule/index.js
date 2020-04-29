const { DateTime } = require('luxon');
const updateDataQualityScores = require('./updateDataQualityScores');
const dailyReportFor = require('./dailyReportFor');

const BATCH_SIZE = 100;

exports.hourly = (context) => {
  console.log('Hourly job', JSON.stringify(context, null, 2));

  updateDataQualityScores(BATCH_SIZE)
    .then(console.log)
    .catch(console.error);

  return null;
};


exports.daily = (context) => {
  console.log('Daily job', JSON.stringify(context, null, 2));

  const today = DateTime.utc().toFormat('yyyy-MM-dd');

  dailyReportFor(today)
    .then(console.log)
    .catch(console.error);

  return null;
};