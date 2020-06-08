const canHandle = input => input.requestEnvelope.request.type === 'IntentRequest'
  && input.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';

const handle = require('../handlers/helpHandler');

module.exports = {
  canHandle,
  handle
};