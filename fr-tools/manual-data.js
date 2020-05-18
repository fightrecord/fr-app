const admin = require('firebase-admin');
const serviceAccount = require("./.keys/fight-record-dev-firebase-adminsdk-8y0j7-4e1cf46df4.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fight-record-dev.firebaseio.com"
});

admin.firestore()
    .collection('fighters')
    .where('country', 'in', ['UK', 'Spain'])
    .limit(500)
    .get()
    .then(snap => snap.docs.map(doc => doc.data()))
    .then(fighters => fighters.sort((a, b) => a._quality.score - b._quality.score))
    .then(fighters => fighters.filter(f => f._quality.actions.length > 3))
    .then(fighters => fighters.map(({ _id, name, _quality: { score, actions } }) => ({ _id, name, score, actions })))
    .then(console.log)
    .catch(console.err);