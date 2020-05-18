const admin = require('firebase-admin');
const serviceAccount = require("../.keys/fight-record-dev-firebase-adminsdk-8y0j7-4e1cf46df4.json");
const integrations = require('../../functions/integrations');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fight-record-dev.firebaseio.com"
});

const port = 4123;

integrations.listen(port, () => {
  console.log(`Integrations app listening on port ${port}!`);
});
