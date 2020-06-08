const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const TIMEZONE = 'UTC';
const integrations = require('./integrations');
const schedule = require('./schedule');

module.exports = {
  // Incoming email
  appmail: functions.https.onRequest(require('./appmail')),

  // Alexa Skill
  alexa: functions.https.onRequest(require('./alexa')),

  // Payment vendor integrations
  integrations: functions.https.onRequest(integrations.webhooks),
  paypalEventCreated: functions.firestore
    .document('integrations/paypal/events/{eventId}')
    .onCreate(integrations.onPaypal),
  stripeEventCreated: functions.firestore
    .document('integrations/stripe/events/{eventId}')
    .onCreate(integrations.onStripe),

  // Runs batch (100) quality assessment report on every hour
  hourlyAssessment: functions.pubsub
    .schedule('0 * * * *')
    .timeZone(TIMEZONE)
    .onRun(schedule.hourly),

  // Runs metrics and quality report at 23:55:00 every day
  dailyReport: functions.pubsub
    .schedule('59 22 * * *')
    .timeZone(TIMEZONE)
    .onRun(schedule.daily)
};
