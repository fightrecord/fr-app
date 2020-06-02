const admin = require('firebase-admin');
const invoice = require('./invoice');

const processEvent = async (doc, context, app = admin) => {
  console.log(doc);
  const { type, data: { object } } = doc.data() || {};

  if (type === 'invoice.payment_succeeded') {
    await invoice.paymentSucceeded(object, app);
  }
};

module.exports = processEvent;
