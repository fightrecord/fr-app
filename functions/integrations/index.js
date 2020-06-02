const express = require('express');
const bodyParser = require('body-parser');

const paypal = require('./paypal');
const stripe = require('./stripe');

const app = express();

app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {
    req.rawBody = buf.toString();
  }
}));

const integrations = express.Router();

integrations.use('/paypal', paypal.webhook);
integrations.use('/stripe', stripe.webhook);
integrations.get('/', (_, res) => {
  res.status(200).send('OK: integrations');
});

app.use('/integrations', integrations);
app.get('/', (_, res) => {
  res.status(200).send('OK');
});

// Export the API
module.exports = {
  webhooks: app,
  onPaypal: paypal.onCreate,
  onStripe: stripe.onCreate
};
