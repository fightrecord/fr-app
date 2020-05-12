const admin = require('firebase-admin');

const requiresNameRule = async ({ name = '' }) => {
  return name && name.length > 0
    ? [100, []]
    : [0, ['This event is missing a name.']];
};

const requiresDateRule = ({ dateTime }) => dateTime ? [75, []] : [0, [
  'This event has no date or start time specified.'
]];

module.exports = [
  requiresNameRule,
  requiresDateRule
];