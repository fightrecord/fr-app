const admin = require('firebase-admin');
const serviceAccount = require("../.keys/fight-record-dev-firebase-adminsdk-8y0j7-4e1cf46df4.json");
const sanitizeData = require('../../functions/schedule/sanitizeData');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fight-record-dev.firebaseio.com"
});

sanitizeData(1, admin)
  .then(console.log)
  .catch(console.error);