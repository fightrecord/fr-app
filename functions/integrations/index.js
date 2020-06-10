const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const integrations = express.Router();

integrations.use(bodyParser.json({
  verify: (req, _, buf) => {
    req.rawBody = buf.toString();
    console.log('Parser Verify', buf, req.rawBody);
  }
}));

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
