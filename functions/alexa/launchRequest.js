const canHandle = input => input.requestEnvelope.request.type === 'LaunchRequest';

const handle = require('./handlers/homeHandler');

module.exports = {
  canHandle,
  handle
};