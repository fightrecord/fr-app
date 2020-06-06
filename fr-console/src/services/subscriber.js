import firebase from 'firebase/app';
import { DateTime } from 'luxon';
import { nextAlphabetically } from './common';

const hydrate = subscriber => {
  const { starts, ends, paidAt } = subscriber;
  const hydrated = { ...subscriber };

  hydrated.starts = DateTime.fromISO(starts);
  hydrated.ends = DateTime.fromISO(ends);
  hydrated.paidAt = DateTime.fromISO(paidAt);

  hydrated.status = 'ok';
  hydrated.next = hydrated.ends.plus({ months: 1 });

  const daysTillExpiry = DateTime.utc().diff(hydrated.next).as('days');
  if (daysTillExpiry > -7) hydrated.status = 'due';
  if (daysTillExpiry > 0) hydrated.status = 'expired';

  return hydrated;
};

const querySubscribers = async (ref, orderBy, direction, limit) => {
  try {

    const snapshot = await ref
      .orderBy(orderBy, direction)
      .limit(limit)
      .get();

    const result = [];

    snapshot.docs.forEach(doc => {
      const subscriber = {
        ...doc.data(),
        _id: doc.id
      };

      result.push(subscriber);
    });

    return result.map(hydrate);

  } catch (error) {
    console.error(error);
  }
};

export const loadOrderedSubscribers = async (orderBy, direction, limit) => {
  const results = await querySubscribers(
    firebase.firestore().collection('subscribers'),
    orderBy, direction, limit);

  return results;
};

export const searchOrderedSubscribers = async (search, limit) => {
  const searchLower = search.toLowerCase();
  const searchNext = nextAlphabetically(searchLower);

  const results = await querySubscribers(
    firebase.firestore()
      .collection('subscribers')
      .where('emailAddress', '>=', searchLower)
      .where('emailAddress', '<', searchNext),
    'emailAddress', 'asc', limit
  );

  return results;
};
