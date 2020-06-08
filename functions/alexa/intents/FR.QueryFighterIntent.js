const canHandle = input => input.requestEnvelope.request.type === 'IntentRequest'
  && input.requestEnvelope.request.intent.name === 'QueryFighterIntent';

const handle = require('../handlers/queryFighterHandler');

module.exports = {
  canHandle,
  handle
};