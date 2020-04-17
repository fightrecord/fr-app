import React from 'react';
import './FighterRecord.css';

export default ({ label, editable = false }) => (
  <div className="fighter-record">
    {label && <label>{label}</label>}
    <div className="parts">
      <div className="part">
        <input type="number" placeholder="0" />
        <label>Win</label>
      </div>
      <div className="part">
        <input type="number" placeholder="0" />
        <label>Draw</label>
      </div>
      <div className="part">
        <input type="number" placeholder="0" />
        <label>Loss</label>
      </div>
    </div>
  </div>
);
