const express = require('express');
const stripe = require('stripe');
const admin = require('firebase-admin');

const config = require('../config/stripe-live');

const router = express.Router();
const client = stripe(config.secretKey);

const logEvent = (request, response) => {
  console.log('Event received from Stripe', request.body);
  const signature = request.headers['stripe-signature'];

  try {
    const event = client.webhooks.constructEvent(
      request.rawBody,
      signature,
      config.endpointSecret);

    admin.firestore()
      .collection('integrations')
      .doc('stripe')
      .collection('events')
      .add(event);

    console.log('Event type', event.type);
    response.status(200).json({ received: true });
  }
  catch (err) {
    console.error(err);
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
};

router.post('/', logEvent);

module.exports = router;
