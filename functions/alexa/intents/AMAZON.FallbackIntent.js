const canHandle = input => input.requestEnvelope.request.type === 'IntentRequest'
  && input.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';

const handle = require('../handlers/homeHandler');

module.exports = {
  canHandle,
  handle
};