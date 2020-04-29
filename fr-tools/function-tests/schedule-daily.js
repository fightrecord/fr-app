const admin = require('firebase-admin');
const { DateTime } = require('luxon');
const serviceAccount = require("../.keys/fight-record-dev-firebase-adminsdk-8y0j7-4e1cf46df4.json");
const dailyReportFor = require('../../functions/schedule/dailyReportFor');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fight-record-dev.firebaseio.com"
});

const fightersRef = admin.firestore()
  .collection('fighters');

const getCreatedDate = direction => fightersRef
  .orderBy('_meta.created', direction)
  .limit(1)
  .get()
  .then(snap => snap.docs[0].data())
  .then(fighter => fighter._meta.created)
  .then(dateTime => DateTime.fromFormat(dateTime, 'yyyy-MM-dd HH:mm:ss').startOf('day'));

const getFirstDate = () => getCreatedDate('asc');
const getLastDate = () => getCreatedDate('desc');

const rebuildReports = async () => {
  const firstDate = await getFirstDate();
  const lastDate = DateTime.utc(); // await getLastDate();
  const days = Math.ceil(lastDate.diff(firstDate).as('days'));

  console.log(firstDate.toISO(), lastDate.toISO(), days);
  const dates = (new Array(days)).fill(0)
    .map((_, offset) => firstDate.plus({ days: offset }).toFormat('yyyy-MM-dd'));

  for (let i = 0; i < dates.length; i++) {
    console.log('Producing report for', dates[i]);
    dailyReportFor(dates[i], admin);
  }
};


rebuildReports();