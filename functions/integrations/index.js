const express = require('express');

const app = express();
const integrations = express.Router();

// Payment Vendors
const paypal = require('./paypal');
const stripe = require('./stripe');
integrations.use('/paypal', paypal.webhook);
integrations.use('/stripe', stripe.webhook);

// Health check
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
