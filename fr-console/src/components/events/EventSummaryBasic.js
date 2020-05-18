import React from 'react';
import { DateTime } from 'luxon';

export default ({ event: { name, dateTime, _id } = {} }) => (
  <div className="info basic">
    <h1>{name}</h1>
    <h2>{dateTime && dateTime.toLocaleString(DateTime.DATE_MED)}</h2>
    <p className="tiny">{_id}</p>
  </div>
);