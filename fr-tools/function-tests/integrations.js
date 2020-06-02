const admin = require('firebase-admin');
const serviceAccount = require("../.keys/fight-record-dev-firebase-adminsdk-8y0j7-4e1cf46df4.json");
const integrations = require('../../functions/integrations');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fight-record-dev.firebaseio.com"
});

admin.firestore()
  .collection('integrations')
  .doc('stripe')
  .collection('events')
  .where('type', '==', 'invoice.payment_succeeded')
  .get()
  .then(snap => {
    snap.docs.map(doc => {
      integrations.onStripe(doc, {}, admin);
    });
  });

