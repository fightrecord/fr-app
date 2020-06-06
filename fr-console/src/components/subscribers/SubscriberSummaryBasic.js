import React from 'react';

export default ({ subscriber: { emailAddress, _id } = {} }) => (
  <div className="info basic">
    <h1>{emailAddress}</h1>
    <p className="tiny">{_id}</p>
  </div>
);