const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const fightersReport = require('./fightersReport');
const eventsReport = require('./eventsReport');
const subscribersReport = require('./subscribersReport');

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

module.exports = (app = admin) => subscribersReport({}, app)
  .then(input => fightersReport(input, app))
  .then(input => eventsReport(input, app))
  .then(storeReport(app));

