import React from 'react';

export default ({ label, number = 0 }) => (
  <div className="report-big-number">
    {label && <label>{label}</label>}
    <p>{number}</p>
  </div>
);