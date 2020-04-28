const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.appmail = functions.https
  .onRequest(require('./appmail'));

const schedule = require('./schedule');
exports.hourlyFightersBatch = functions.pubsub
  .schedule('0 * * * *')
  .onRun(schedule.hourly);