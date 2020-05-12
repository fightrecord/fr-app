const sanitizeEventData = require('./sanitizeEventData');
const sanitizeFighterData = require('./sanitizeFighterData');

const EVENT_BATCH_SIZE = 10;
const FIGHTER_BATCH_SIZE = 100;

// Update Data Quality Scores
module.exports = (app = admin) => Promise.all([
  sanitizeEventData(EVENT_BATCH_SIZE, app),
  sanitizeFighterData(FIGHTER_BATCH_SIZE, app)
]);