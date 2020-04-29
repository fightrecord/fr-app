import React from 'react';

export default ({ bout }) => {
  const { event: { name, rules } = {} } = bout;

  return (
    <div className="info event">
      <div className="detail name">
        <label>Event</label>
        <p>{name}</p>
      </div>
      <div className="detail rules">
        <label>Rules</label>
        <p>{rules}</p>
      </div>
    </div>
  );
};