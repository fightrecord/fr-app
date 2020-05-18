const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {
    req.rawBody = buf.toString();
  }
}));

const integrations = express.Router();

integrations.use('/paypal', require('./paypal'));
integrations.use('/stripe', require('./stripe'));
integrations.get('/', (_, res) => {
  res.status(200).send('OK: integrations');
});

app.use('/integrations', integrations);
app.get('/', (_, res) => {
  res.status(200).send('OK');
});

// Export the API
module.exports = app;
