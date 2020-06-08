const canHandle = () => true;

const handle = require('./handlers/errorHandler');

module.exports = {
  canHandle,
  handle
};