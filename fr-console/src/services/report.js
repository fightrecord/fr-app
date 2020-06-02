import firebase from 'firebase/app';
import { DateTime } from 'luxon';

const reportCache = {};

export const loadLatestReport = async () => {
  try {
    const snapshot = await firebase.firestore()
      .collection('dailyreports')
      .orderBy('_meta.created', 'desc')
      .limit(1)
      .get();

    return snapshot.docs[0] && snapshot.docs[0].data();
  } catch (error) {
    console.error(error);
    return error;
  }
};

const defaultReport = day => ({
  _meta: {
    created: DateTime.utc().toISO(),
    createdDate: day,
    isReportingGap: true
  },
  quality: {},
  metrics: {}
});

export const loadReport = async (from, to) => {
  try {
    const first = from.startOf('day');
    const last = to.startOf('day');

    const dayCount = last.diff(first).as('days') + 1;
    if (dayCount <= 0) return [];

    const days = (new Array(dayCount))
      .fill(0)
      .map((_, offset) => first.plus({ days: offset }).toISODate());

    const cachedDays = Object.keys(reportCache);
    const missingDays = days.filter(day => cachedDays.indexOf(day) < 0);

    const promises = missingDays.map(day => firebase.firestore()
      .collection('dailyreports')
      .where('_meta.createdDate', '==', day)
      .limit(1)
      .get());

    const snapshots = await Promise.all(promises);

    // Cache the reports
    snapshots
      .map(snap => snap.docs[0])
      .filter(doc => doc)
      .map(doc => ({ ...doc.data(), _id: doc.id }))
      .forEach(report => reportCache[report._meta.createdDate] = report);

    const reports = days.map(day => reportCache[day] || defaultReport(day));

    return reports;
  } catch (error) {
    console.error(error);
    return error;
  }
};