import React from 'react';

export default ({ event: { name, dateTime, _id } = {} }) => (
  <div className="info basic">
    <h1>{name}</h1>
    <h2>{dateTime && dateTime.toISO()}</h2>
    <p className="tiny">{_id}</p>
  </div>
);