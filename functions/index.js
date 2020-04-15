const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.appmail = functions.https.onRequest(require('./appmail'));
