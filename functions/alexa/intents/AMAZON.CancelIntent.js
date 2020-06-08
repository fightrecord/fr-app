const canHandle = input => input.requestEnvelope.request.type === 'IntentRequest'
  && input.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent';

const handle = require('../handlers/exitHandler');

module.exports = {
  canHandle,
  handle
};