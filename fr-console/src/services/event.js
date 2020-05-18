import firebase from 'firebase/app';
import { DateTime } from 'luxon';
import { nextAlphabetically } from './common';

const hydrate = event => {
  const { dateTime } = event;

  event.dateTime = dateTime ? DateTime.fromISO(dateTime) : null;

  return event;
};

const queryEvents = async (ref, orderBy, direction, limit) => {
  try {

    const snapshot = await ref
      .orderBy(orderBy, direction)
      .limit(limit)
      .get();

    const result = [];

    snapshot.docs.forEach(doc => {
      const event = {
        ...doc.data(),
        _id: doc.id
      };

      result.push(event);
    });

    return result.map(hydrate);

  } catch (error) {
    console.error(error);
  }
};

export const loadOrderedEvents = async (orderBy, direction, limit) => {
  const results = await queryEvents(
    firebase.firestore().collection('events'),
    orderBy, direction, limit);

  return results;
};

export const searchOrderedEvents = async (search, limit) => {
  const searchLower = search.toLowerCase();
  const searchNext = nextAlphabetically(searchLower);

  const results = await queryEvents(
    firebase.firestore()
      .collection('events')
      .where('searchableName', '>=', searchLower)
      .where('searchableName', '<', searchNext),
    'searchableName', 'asc', limit
  );

  return results;
};

export const loadEventHistory = async eventId => {
  console.log('Load history for', eventId);

  const bouts = await firebase.firestore()
    .collection('events')
    .doc(eventId)
    .collection('bouts')
    .get()
    .then(snap => {
      const bouts = snap.docs.map(doc => ({
        ...doc.data(),
        _id: doc.id
      }));

      console.log(bouts)

      return bouts;
    })
    .catch(console.error);

  return bouts;
};
