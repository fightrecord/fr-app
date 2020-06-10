const express = require('express');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const { getAccessToken } = require('./auth');

const { api_url, webhook_id } = require('../../config/paypal-live');

const router = express.Router();

const logEvent = event => admin.firestore()
  .collection('integrations')
  .doc('paypal')
  .collection('events')
  .add(event);

const processEvent = async (req, res) => {
  console.log('Event received from PayPal', req.body);

  const { access_token, token_type } = await getAccessToken();
  const apiPath = `${api_url}/v1/notifications/verify-webhook-signature`;

  const payload = {
    method: 'POST',
    body: JSON.stringify({
      auth_algo: req.headers['paypal-auth-algo'],
      cert_url: req.headers['paypal-auth-version'],
      transmission_id: req.headers['paypal-transmission-id'],
      transmission_sig: req.headers['paypal-transmission-sig'],
      transmission_time: req.headers['paypal-transmission-time'],
      webhook_id,
      webhook_event: req.body
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token_type} ${access_token}`
    }
  };

  console.log(payload);
  const result = await fetch(apiPath, payload).then(res => res.json());

  console.log(result);
  /* When verification is fixed, make sure we update this to reject on failure */

  await logEvent(req.body);

  res.status(200).json({ received: true });
};

router.post('/', processEvent);

module.exports = router;
