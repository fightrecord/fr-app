const admin = require('firebase-admin');
const sanitizeEventData = require('./sanitizeEventData');
const sanitizeFighterData = require('./sanitizeFighterData');

const EVENT_BATCH_SIZE = 10;
const FIGHTER_BATCH_SIZE = 100;

// Update Data Quality Scores
module.exports = (batchSize, app = admin) => Promise.all([
  sanitizeEventData(batchSize || EVENT_BATCH_SIZE, app),
  sanitizeFighterData(batchSize || FIGHTER_BATCH_SIZE, app)
]);