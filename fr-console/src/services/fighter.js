import firebase from 'firebase/app';
import { DateTime } from 'luxon';
import { loadClassesById } from './classes';
import { loadTeamsById } from './teams';

const dataQualityRules = [

];

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

export const loadRecentFighters = async () => {
  try {

    const snapshot = await firebase.firestore()
      .collection('fighters')
      .orderBy('_meta.modified', 'desc')
      .limit(20)
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
