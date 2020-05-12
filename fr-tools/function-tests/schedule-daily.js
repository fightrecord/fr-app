const admin = require('firebase-admin');
const serviceAccount = require("../.keys/fight-record-dev-firebase-adminsdk-8y0j7-4e1cf46df4.json");
const dailyReport = require('../../functions/schedule/dailyReport');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fight-record-dev.firebaseio.com"
});

dailyReport(admin)
  .catch(console.error);