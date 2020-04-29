import React from 'react';

export default ({ fighter: { name, teamName, _id } = {} }) => (
  <div className="info basic">
    <h1>{name}</h1>
    <h2>{teamName}</h2>
    <p className="tiny">{_id}</p>
  </div>
);