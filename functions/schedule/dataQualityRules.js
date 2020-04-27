const requiresNameRule = ({ name = '' }) => {
  const parts = name.split(' ');
  // Pristine 2 names or more with each name having 2 letters or more
  if (parts.length >= 2 && parts.reduce((a, p) => a && p.length >= 2, true)) {
    // Score 100, no actions
    return [100, []];
  }
  // Good at least one name having 2 letters or more
  if (name.length >= 2) {
    return [50, ['Only one name given, you could add a surname or first name']]; // Score 50, 1 action
  }
  return [0, ['This fighter record is missing a name']]; // Score 0, 1 action
};

const requiresTeamRule = ({ team }) => team ? [75, []] : [0, [
  'This fighter record has no team specified'
]];

const requiresMetricsRule = ({ weight, height }) => {
  let score = 0;
  const actions = [];
  // Check the weight
  if (weight && weight > 0) score += 25; // Having a weight scores 25
  else actions.push('This fighter record has no weight');
  // Check the height
  if (height && height > 0) score += 25; // Having a height scores 25
  else actions.push('This fighter record has no height');

  return [score, actions];
};

const requiresRecordRule = ({ record }) => {
  let score = 0;
  const actions = [];
  if (record && record.length > 0) {
    score += 10;
    score += record.reduce((acc, { discipline, draw, lost, won }) => {
      let recordScore = 0;
      // A full record with a discipline scores 450
      recordScore += discipline ? 150 : 0;
      recordScore += draw !== null ? 100 : 0;
      recordScore += lost !== null ? 100 : 0;
      recordScore += won !== null ? 100 : 0;
      return acc + recordScore;
    }, 0);
  } else {
    actions.push('No fight records listed for this fighter record')
  }

  return [score, actions];
};

module.exports = [
  requiresNameRule,
  requiresTeamRule,
  requiresMetricsRule,
  requiresRecordRule
];