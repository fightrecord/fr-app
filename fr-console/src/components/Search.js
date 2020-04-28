import React from 'react';

export default ({ label, onChange = () => null }) => (
  <div className="search">
    <input onChange={ev => onChange(ev.target.value)} placeholder={label} />
  </div>
);