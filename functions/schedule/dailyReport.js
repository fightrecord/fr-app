const fs = require('fs');
const path = require('path');

const admin = require('firebase-admin');
const { DateTime } = require('luxon');

const snapshotToArray = snapshot => snapshot.docs
  .map(doc => Object.assign(
    doc.data(),
    { _id: doc.id }
  ));

const loadAllFighters = (app = admin) => app.firestore()
  .collection('fighters')
  .get()
  .then(snapshotToArray)
  .then(fighters => ({ fighters }));

const compileTotals = input => {
  const { fighters } = input;
  console.log('Compiling totals for', fighters.length, 'fighters');

  const metrics = {
    totalRecords: 0,
    gender: {},
    country: {},
    class: {},
    age: {},
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
    incrementCount('age', age);
    incrementCount('ageGroup', ageGroup);

    // Calculating the data quality range for the next iteration
    const { minScore, maxScore } = quality;

    if (!minScore || minScore > score) {
      quality.minScore = score;
    }

    if (!maxScore || maxScore < score) {
      quality.maxScore = score;
    }
  });

  return Object.assign(input, {
    metrics: { fighters: metrics },
    quality: { fighters: quality }
  });
};

const assessDataQuality = input => {
  const {
    fighters,
    quality: { fighters: { minScore, maxScore } }
  } = input;

  const metrics = {
    count: 0,
    total: 0,
    max: maxScore,
    min: minScore,
    median: (maxScore - minScore) * 0.5,
    scores: {},
    quartiles: {}
  };

  const incrementCount = (propName, value) => {
    const currentCount = metrics[propName][value];
    const newCount = currentCount ? currentCount + 1 : 1;
    metrics[propName] = Object.assign(metrics[propName], {
      [value]: newCount
    });
  };

  const getQuartile = score => {
    const interQuartileRange = (maxScore - minScore) / 4.0;
    const quartile = Math.floor((score - minScore) / interQuartileRange);
    return quartile > 3 ? 3 : quartile; // To handle score === maxScore
  };

  fighters.forEach(fighter => {
    const { _quality: { score } = {} } = fighter;

    const quartile = score ? getQuartile(score) : score;

    metrics.count += 1;
    metrics.total += score;
    incrementCount('scores', score);
    incrementCount('quartiles', quartile);
  });

  metrics.average = metrics.total / metrics.count;

  return Object.assign(input, {
    quality: { fighters: metrics }
  });
};

const storeReport = (app = admin) => input => {
  const now = DateTime.utc();
  const { metrics, quality } = input;

  const dailyReport = {
    _meta: {
      created: now.toISO(),
      createdDate: now.toISODate()
    },
    metrics,
    quality
  };

  return app.firestore()
    .collection('dailyreports')
    .add(dailyReport)
    .then(() => dailyReport);
};

module.exports = (app = admin) => loadAllFighters(app)
  .then(compileTotals)
  .then(assessDataQuality)
  .then(storeReport(app))
  .then(console.log);
