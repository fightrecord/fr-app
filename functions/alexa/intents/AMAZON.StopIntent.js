const canHandle = input => input.requestEnvelope.request.type === 'IntentRequest'
  && input.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';

const handle = require('../handlers/exitHandler');

module.exports = {
  canHandle,
  handle
};