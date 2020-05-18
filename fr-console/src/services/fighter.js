import firebase from 'firebase/app';
import { DateTime } from 'luxon';
import { loadClassesById } from './classes';
import { loadTeamsById } from './teams';
import { nextAlphabetically } from './common';

const hydrate = (classes, teams) => fighter => {
  const { city, class: cls, country, dob, region, team } = fighter;

  delete fighter._meta.legacy;

  fighter.dob = dob ? DateTime.fromISO(dob) : null;
  fighter.age = fighter.dob ? Math.floor(DateTime.utc().diff(fighter.dob).as('years')) : 0;

  if (fighter.age < 10) {
    delete fighter.dob;
    delete fighter.age;
  }

  if (region === country) delete fighter.region;
  if (region === city) delete fighter.region;

  fighter.teamName = teams[team] ? teams[team].name : '';
  fighter.className = classes[cls] ? classes[cls].name : '';

  return fighter;
};

const queryFighters = async (ref, orderBy, direction, limit) => {
  try {

    const snapshot = await ref
      .orderBy(orderBy, direction)
      .limit(limit)
      .get();

    const result = [];
    const classIds = {};
    const teamIds = {};

    snapshot.docs.forEach(doc => {
      const fighter = {
        ...doc.data(),
        _id: doc.id
      };

      if (fighter.class) classIds[fighter.class] = {};
      if (fighter.team) teamIds[fighter.team] = {};

      result.push(fighter);
    });

    const classes = await loadClassesById(Object.keys(classIds));
    const teams = await loadTeamsById(Object.keys(teamIds));

    return result.map(hydrate(classes, teams));

  } catch (error) {
    console.error(error);
  }
};

export const loadOrderedFighters = async (orderBy, direction, limit) => {
  const results = await queryFighters(
    firebase.firestore().collection('fighters'),
    orderBy, direction, limit);

  return results;
};

export const searchOrderedFighters = async (search, limit) => {
  const searchLower = search.toLowerCase();
  const searchNext = nextAlphabetically(searchLower);

  const results = await queryFighters(
    firebase.firestore()
      .collection('fighters')
      .where('searchableName', '>=', searchLower)
      .where('searchableName', '<', searchNext),
    'searchableName', 'asc', limit
  );

  return results;
};

export const loadFighterHistory = async fighterId => {
  console.log('Load history for', fighterId);

  const bouts = await firebase.firestore()
    .collectionGroup('bouts')
    .where('_meta.fighterIds', 'array-contains', fighterId)
    .get()
    .then(snap => {
      const bouts = snap.docs.map(doc => ({
        ...doc.data(),
        _id: doc.id
      }));

      return bouts;
    })
    .catch(console.error);

  return bouts;
};
