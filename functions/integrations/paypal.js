const express = require('express');
const paypal = require('paypal-rest-sdk');
const admin = require('firebase-admin');

const config = require('../config/paypal-live');
const router = express.Router();

paypal.configure(config);

const logEvent = (req, res) => {
  console.log('Event received from PayPal', req.body);

  const onResponse = (error, response) => {
    if (error) {
      console.error(error);

      response.status(400).send(`Webhook Error: ${error}`);
    } else if (response.verification_status === "SUCCESS") {
      admin.firestore()
        .collection('integrations')
        .doc('stripe')
        .collection('events')
        .add(event);

      console.log('Event type', event.type);

      response.status(200).json({ received: true });
    } else {
      console.error(`Webhook Verification Failure`);

      response.status(400).send(`Webhook Verification Failure`);
    }
  };

  paypal.notification.webhookEvent.verify(
    req.headers,
    req.body,
    config.webhook_id,
    onResponse);
};

router.post('/', logEvent);

module.exports = router;
