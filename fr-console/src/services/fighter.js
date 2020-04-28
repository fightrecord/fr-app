import firebase from 'firebase/app';
import { DateTime } from 'luxon';
import { loadClassesById } from './classes';
import { loadTeamsById } from './teams';
import { nextAlphabetically } from './common';

const calculatDataQualityScore = fighter => {

  return 0;
};

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

  fighter.dataQuality = calculatDataQualityScore(fighter);

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

export const loadOrderedFighters = (orderBy, direction, limit) => {
  return queryFighters(
    firebase.firestore().collection('fighters'),
    orderBy, direction, limit);
}

export const searchOrderedFighters = (search, limit) => {
  const searchLower = search.toLowerCase();
  const searchNext = nextAlphabetically(searchLower);

  return queryFighters(
    firebase.firestore()
      .collection('fighters')
      .where('searchableName', '>=', searchLower)
      .where('searchableName', '<', searchNext),
    'searchableName', 'asc', limit
  );
}
