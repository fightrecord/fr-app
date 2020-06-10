const admin = require('firebase-admin');
const payment = require('./payment');

const processEvent = async (doc, context, app = admin) => {
  const { event_type, resource } = doc.data() || {};
  console.log(event_type, resource);

  if (event_type === 'PAYMENT.SALE.COMPLETED') {
    await payment.paymentSaleCompleted(resource, app);
  }
};

module.exports = processEvent;
