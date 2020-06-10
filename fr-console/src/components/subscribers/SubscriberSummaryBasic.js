import React from 'react';

export default ({ subscriber: { emailAddress, name, _id } = {} }) => (
  <div className="info basic">
    <h1>{name}</h1>
    <h2>{emailAddress}</h2>
    <p className="tiny">{_id}</p>
  </div>
);