const admin = require('firebase-admin');

const requiresNameRule = async ({ name = '' }) => {
  const parts = name.split(' ');
  // Pristine 2 names or more with each name having 1 letter or more
  if (parts.length >= 2 && parts.reduce((a, p) => a && p.length >= 1, true)) {
    // Score 100, no actions
    return [100, []];
  }
  return [0, ['This fighter is missing a name.']]; // Score 0, 1 action
};

const requiresTeamRule = ({ team }) => team ? [75, []] : [0, [
  'This fighter has no team specified.'
]];

const requiresMetricsRule = async ({ weight, height }) => {
  let score = 0;
  const actions = [];
  // Check the weight
  if (weight && weight > 0) score += 25; // Having a weight scores 25
  else actions.push('This fighter has no weight.');
  // Check the height
  if (height && height > 0) score += 25; // Having a height scores 25
  else actions.push('This fighter has no height.');

  return [score, actions];
};

const requiresRecordRule = async ({ record }) => {
  let score = 0;
  const actions = [];
  if (record && record.length > 0) {
    score += record.reduce((acc, { discipline, draw, lost, won }) => {
      let recordScore = 0;
      // A full record with a discipline scores 450
      recordScore += discipline ? 150 : 0;
      recordScore += draw !== null ? 100 : 0;
      recordScore += lost !== null ? 100 : 0;
      recordScore += won !== null ? 100 : 0;
      return acc + recordScore;
    }, 0);
    actions.push('This fighter has an incomplete record.')
  } else {
    actions.push('No fight records listed for this fighter.')
  }

  return [score, actions];
};

const snapshotToArray = snap => snap.docs.map(doc => Object.assign(
  doc.data(),
  { _id: doc.id }
));

const unconfirmedRecord = async ({ _id, record }, app = admin) => {
  try {
    const boutSnapshot = await app.firestore()
      .collectionGroup('bouts')
      .where('_meta.fighterIds', 'array-contains', _id)
      .get();

    const bouts = snapshotToArray(boutSnapshot);

    const unconfirmedRecord = bouts.reduce((acc, { wasDraw, winnerId }) => {
      if (wasDraw) acc.draw += 1;
      else if (winnerId === _id) acc.won += 1;
      else acc.lost += 1;

      return acc;
    }, {
      unConfirmed: true,
      won: 0,
      lost: 0,
      draw: 0
    });

    return [0, [], { record: [...record, unconfirmedRecord] }];
  } catch (error) {
    console.error(error);
    return [0, []];
  }

};

module.exports = [
  requiresNameRule,
  requiresTeamRule,
  requiresMetricsRule,
  requiresRecordRule,
  unconfirmedRecord
];