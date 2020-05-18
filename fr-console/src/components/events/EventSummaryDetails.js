import React from 'react';
import { DateTime } from 'luxon';

export default ({ event: { dateTime } = {} }) => (
  <div className="info details">
    <div className="detail age">
      <label>Doors</label>
      <p>{dateTime && dateTime.toLocaleString(DateTime.TIME_SIMPLE)}</p>
    </div>
  </div>
);