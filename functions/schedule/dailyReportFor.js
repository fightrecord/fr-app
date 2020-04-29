const admin = require('firebase-admin');
const { DateTime } = require('luxon');

const createdFighters = (date, app = admin) => {
  const dtFrom = DateTime.fromISO(date).startOf('day');
  const dtTo = dtFrom.plus({ days: 1 });

  return app
    .firestore()
    .collection('fighters')
    .where('_meta.created', '>=', dtFrom.toFormat('yyyy-MM-dd'))
    .where('_meta.created', '<', dtTo.toFormat('yyyy-MM-dd'))
    .get()
    .then(snapshot => snapshot.docs.map(doc => Object.assign(doc.data(), { _id: doc.id })));
};

const produceDayReport = fighters => {
  const report = {
    createdToday: {
      total: fighters.length,
      byGender: fighters.reduce((acc, { gender }) => Object.assign(acc, {
        [gender]: acc[gender] ? acc[gender] + 1 : 1
      }), {}),
      byCountry: fighters.reduce((acc, { country }) => Object.assign(acc, {
        [country]: acc[country] ? acc[country] + 1 : 1
      }), {}),
      byCity: fighters.reduce((acc, { city }) => Object.assign(acc, {
        [city]: acc[city] ? acc[city] + 1 : 1
      }), {})
    }
  };

  return {
    fighters,
    report
  };
};

const storeReport = (date, app = admin) => ({ report }) => {
  return app
    .firestore()
    .collection('reports')
    .doc(date)
    .set(report);
};

module.exports = (date, app = admin) => createdFighters(date, app)
  .then(produceDayReport)
  .then(storeReport(date, app))
  .then(console.log)
  .catch(console.error);
