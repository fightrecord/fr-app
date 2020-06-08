const fs = require('fs');
const admin = require('firebase-admin');

const serviceAccount = require("../.keys/fight-record-dev-firebase-adminsdk-8y0j7-4e1cf46df4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fight-record-dev.firebaseio.com"
});

admin.firestore()
  .collection('fighters')
  .get()
  .then(snap => snap.docs.map(doc => Object.assign(doc.data(), { _id: doc.id })))
  .then(fighters => fighters.map(({ _id, name, aliases = [] }) => `${name},${_id},${aliases.join(',')}`))
  .then(fighters => fighters.join('\n'))
  .then(fighters => fs.writeFileSync('./fighterNames.csv', fighters, { encoding: 'UTF8' }));