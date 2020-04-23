import { DateTime } from 'luxon';

export const hydrate = teams => fighter => {
  const { city, country, dob, region, team } = fighter;

  delete fighter._meta.legacy;

  fighter.dob = dob ? DateTime.fromISO(dob) : null;
  fighter.age = fighter.dob ? Math.floor(DateTime.utc().diff(fighter.dob).as('years')) : 0;

  if (fighter.age < 10) {
    delete fighter.dob;
    delete fighter.age;
  }

  if (region === country) delete fighter.region;
  if (region === city) delete fighter.region;

  fighter.teamName = teams[team] ? teams[team].name : 'N/A';

  return fighter;
};