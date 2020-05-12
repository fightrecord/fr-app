const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const { processSnapshot } = require('./sanitizeCommon');
const { assessDataQuality } = require('./reportCommon');

const loadAllFighters = (input = {}, app = admin) => app.firestore()
  .collection('fighters')
  .get()
  .then(processSnapshot)
  .then(fighters => Object.assign(input, { fighters }));

const compileTotals = input => {
  const { fighters } = input;
  console.log('Compiling totals for', fighters.length, 'fighters');

  const metrics = {
    totalRecords: 0,
    gender: {},
    country: {},
    class: {},
    ageGroup: {}
  };

  const quality = {};

  const incrementCount = (propName, value) => {
    const currentCount = metrics[propName][value];
    const newCount = currentCount ? currentCount + 1 : 1;
    metrics[propName] = Object.assign(metrics[propName], {
      [value]: newCount
    });
  };

  const getAgeGroup = age => {
    if (age < 4 || age > 120) return undefined;
    const factor = Math.floor(age / 10.0) * 10;
    return `${factor}-${factor + 10}`;
  };

  fighters.forEach(fighter => {
    const {
      gender, country, dob,
      _quality: { score } = {}
    } = fighter;

    // Building the total by group
    let age = dob && Math.floor(
      DateTime.utc().diff(DateTime.fromISO(dob)).as('years')
    );

    if (age < 4 || age > 120) {
      age = undefined;
    }

    const ageGroup = age ? getAgeGroup(age) : age;

    metrics.totalRecords += 1;
    incrementCount('gender', gender);
    incrementCount('country', country);
    incrementCount('class', fighter.class, true);
    incrementCount('ageGroup', ageGroup);

    // Calculating the data quality range for the next iteration
    const { minScore, maxScore } = quality;
    if (typeof minScore === 'undefined' || minScore > score) {
      quality.minScore = score;
    }
    if (typeof maxScore === 'undefined' || maxScore < score) {
      quality.maxScore = score;
    }
  });

  return Object.assign(input, {
    metrics: Object.assign(input.metrics || {}, { fighters: metrics }),
    quality: Object.assign(input.quality || {}, { fighters: quality }),
  });
};

module.exports = (input = {}, app = admin) => loadAllFighters(input, app)
  .then(compileTotals)
  .then(assessDataQuality('fighters'));
