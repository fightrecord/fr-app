import React from 'react';
import { DateTime } from 'luxon';

export default ({ subscriber: { paidAt, amountPaid, currency } = {} }) => (
  <div className="info payment">
    <div className="detail paid">
      <label>Paid</label>
      <p>{(amountPaid / 100.0).toFixed(2)} {currency.toUpperCase()}</p>
    </div>
    <div className="detail paidAt">
      <label>Received</label>
      <p>{paidAt.toLocaleString(DateTime.DATE_FULL)}</p>
    </div>
  </div>
);