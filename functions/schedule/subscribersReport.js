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
    vendorCount: {},
    vendorRevenue: {},
    vendorCountToday: {},
    vendorRevenueToday: {}
  };

  const incrementCount = (propName, value, offset = 1) => {
    const currentCount = metrics[propName][value];
    const newCount = currentCount ? currentCount + offset : offset;
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
      incrementCount('vendorCountToday', vendor);
      incrementCount('vendorRevenueToday', vendor, amountPaid);
    }

    incrementCount('lastPaid', month);
    incrementCount('vendorCount', vendor);
    incrementCount('vendorRevenue', vendor, amountPaid);
  });

  return Object.assign(input, {
    metrics: Object.assign(input.metrics || {}, { subscribers: metrics })
  });
};

module.exports = (input = {}, app = admin) => loadAllSubscribers(input, app)
  .then(compileTotals);
