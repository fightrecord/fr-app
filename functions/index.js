const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Incoming email
exports.appmail = functions.https
  .onRequest(require('./appmail'));

// Payment vendor integrations
exports.integrations = functions.https
  .onRequest(require('./integrations'));

const TIMEZONE = 'UTC';
const schedule = require('./schedule');

// Runs batch (100) quality assessment report on every hour
exports.hourlyAssessment = functions.pubsub
  .schedule('0 * * * *')
  .timeZone(TIMEZONE)
  .onRun(schedule.hourly);

// Runs metrics and quality report at 23:55:00 every day
exports.dailyReport = functions.pubsub
  .schedule('55 23 * * *')
  .timeZone(TIMEZONE)
  .onRun(schedule.daily);
