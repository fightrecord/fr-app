const admin = require('firebase-admin');
const fetch = require('node-fetch');
const { getAccessToken } = require('./auth');
const { DateTime } = require('luxon');

const { api_url } = require('../../config/paypal-live');

const getBillingAgreement = async agreementId => {
  const { access_token, token_type } = await getAccessToken();

  const apiPath = `${api_url}/v1/payments/billing-agreements/${agreementId}`;

  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token_type} ${access_token}`
    }
  };

  return await fetch(apiPath, payload).then(res => res.json());
};

exports.paymentSaleCompleted = async (data, app = admin) => {
  const { billing_agreement_id } = data;

  const {
    update_time,
    transaction_fee: { currency: feeCurrency, value: fee }
  } = data;
  const agreementInfo = await getBillingAgreement(billing_agreement_id);

  const {
    agreement_details,
    id,
    payer: { payer_info } = {}
  } = agreementInfo;

  const {
    last_payment_amount: { currency, value: amount },
    last_payment_date,
    next_billing_date,
    cycles_completed
  } = agreement_details || {};

  const {
    email,
    payer_id,
    first_name,
    last_name
  } = payer_info || {};

  if (!email) return;

  const subscriberRef = app.firestore()
    .collection('subscribers');

  const snap = await subscriberRef
    .where('emailAddress', '==', email.toLowerCase())
    .get();

  const doc = snap.docs[0];
  const subscriber = doc ? doc.data() : {};

  const updated = Object.assign(subscriber, {
    emailAddress: email.toLowerCase(),
    name: `${first_name} ${last_name}`,
    vendor: {
      type: 'paypal',
      meta: {
        agreementId: id,
        agreementLink: `${api_url}/v1/payments/billing-agreements/${id}`,
        payerId: payer_id
      }
    },
    starts: DateTime.fromISO(last_payment_date).toUTC().toISO(),
    ends: DateTime.fromISO(next_billing_date).toUTC().toISO(),
    amountDue: amount * 100,
    amountPaid: amount * 100,
    paidAt: DateTime.fromISO(update_time).toUTC().toISO(),
    currency,
    fee,
    feeCurrency,
    numPaymentsMade: cycles_completed
  });

  const storeRef = doc
    ? subscriberRef.doc(doc.id)
    : subscriberRef.doc();

  const result = await storeRef.set(updated);

  console.log(result);
};