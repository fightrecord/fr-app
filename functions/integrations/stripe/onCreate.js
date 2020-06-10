const admin = require('firebase-admin');
const invoice = require('./invoice');

const processEvent = async (doc, context, app = admin) => {
  const { type, data: { object } } = doc.data() || {};
  console.log(type, object);

  if (type === 'invoice.payment_succeeded') {
    await invoice.paymentSucceeded(object, app);
  }
};

module.exports = processEvent;
