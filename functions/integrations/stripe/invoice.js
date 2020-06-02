const admin = require('firebase-admin');
const { DateTime } = require('luxon');

exports.paymentSucceeded = async (data, app = admin) => {
  const {
    customer_email, id, invoice_pdf, period_start, period_end,
    amount_paid, amount_due, currency, finalized_at
  } = data;

  if (!customer_email) return;

  const subscriberRef = app.firestore()
    .collection('subscribers');

  const snap = await subscriberRef
    .where('emailAddress', '==', customer_email.toLowerCase())
    .get();

  const doc = snap.docs[0];
  const subscriber = doc ? doc.data() : {};

  const updated = Object.assign(subscriber, {
    emailAddress: customer_email.toLowerCase(),
    vendor: {
      type: 'stripe',
      meta: {
        invoiceId: id,
        invoiceLink: invoice_pdf
      }
    },
    starts: DateTime.fromSeconds(period_start).toISO(),
    ends: DateTime.fromSeconds(period_end).toISO(),
    amountDue: amount_due,
    amountPaid: amount_paid,
    paidAt: DateTime.fromSeconds(finalized_at).toISO(),
    currency
  });

  const storeRef = doc
    ? subscriberRef.doc(doc.id)
    : subscriberRef.doc();

  const result = await storeRef.set(updated);

  console.log(result);
};