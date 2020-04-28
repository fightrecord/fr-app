const updateDataQualityScores = require('./updateDataQualityScores');

const BATCH_SIZE = 100;

exports.hourly = (context) => {
  console.log('Hourly job', JSON.stringify(context, null, 2));

  updateDataQualityScores(BATCH_SIZE)
    .then(console.log)
    .catch(console.error);

  return null;
}