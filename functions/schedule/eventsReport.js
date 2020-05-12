const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const { processSnapshot } = require('./sanitizeCommon');
const { assessDataQuality } = require('./reportCommon');

const loadAllEvents = (input = {}, app = admin) => app.firestore()
  .collection('events')
  .get()
  .then(processSnapshot)
  .then(events => Object.assign(input, { events }));

const compileTotals = input => {
  const { events } = input;
  console.log('Compiling totals for', events.length, 'events');

  const metrics = {
    totalRecords: 0,
    month: {}
  };

  const quality = {};

  const incrementCount = (propName, value) => {
    const currentCount = metrics[propName][value];
    const newCount = currentCount ? currentCount + 1 : 1;
    metrics[propName] = Object.assign(metrics[propName], {
      [value]: newCount
    });
  };

  events.forEach(event => {
    const {
      dateTime,
      _quality: { score } = {}
    } = event;

    // Building the total by group
    let month = dateTime && DateTime.fromISO(dateTime).toFormat('yyyy-MM')

    metrics.totalRecords += 1;
    incrementCount('month', month);

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
    metrics: Object.assign(input.metrics || {}, { events: metrics }),
    quality: Object.assign(input.quality || {}, { events: quality }),
  });
};

module.exports = (input = {}, app = admin) => loadAllEvents(input, app)
  .then(compileTotals)
  .then(assessDataQuality('events'));
