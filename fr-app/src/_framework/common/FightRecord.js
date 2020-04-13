import React from 'react';

export default ({ label, editable = false }) => (
  <div className="fight-record">
    {label && <label>{label}</label>}
    Record
  </div>
);
