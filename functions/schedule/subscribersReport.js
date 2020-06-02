const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const { processSnapshot } = require('./sanitizeCommon');

const loadAllSubscribers = (input = {}, app = admin) => app.firestore()
  .collection('subscribers')
  .get()
  .then(processSnapshot)
  .then(subscribers => Object.assign(input, { subscribers }));

const compileTotals = input => {
  const { subscribers } = input;
  console.log('Compiling totals for', subscribers.length, 'subscribers');

  const metrics = {
    totalRecords: 0,
    totalPaidToday: 0,
    totalRevenueToday: 0,
    lastPaid: {},
    daysSincePayment: {},
    vendor: {}
  };

  const incrementCount = (propName, value) => {
    const currentCount = metrics[propName][value];
    const newCount = currentCount ? currentCount + 1 : 1;
    metrics[propName] = Object.assign(metrics[propName], {
      [value]: newCount
    });
  };

  subscribers.forEach(subscriber => {
    const { amountPaid, paidAt, vendor: { type: vendor } = {} } = subscriber;

    const dtPaid = paidAt && DateTime.fromISO(paidAt);

    // Building the total by group
    let month = dtPaid && dtPaid.toFormat('yyyy-MM')
    metrics.totalRecords += 1;

    const daysSincePayment = dtPaid && Math.floor(DateTime.utc().diff(dtPaid).as('days'));
    if (daysSincePayment === 0) {
      metrics.totalPaidToday += 1;
      metrics.totalRevenueToday += amountPaid;
    }

    incrementCount('lastPaid', month);
    incrementCount('daysSincePayment', daysSincePayment);
    incrementCount('vendor', vendor);
  });

  return Object.assign(input, {
    metrics: Object.assign(input.metrics || {}, { subscribers: metrics })
  });
};

module.exports = (input = {}, app = admin) => loadAllSubscribers(input, app)
  .then(compileTotals);
