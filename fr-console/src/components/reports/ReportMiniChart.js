import React from 'react';

export default ({ data }) => {
  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="report-mini-chart">
      {data.map(({ label, value }) => (
        <div className="data-point" key={label}>
          <label>{label}</label>
          <div className="bar">
            <div className="bar-filled" style={{ flex: value }} />
            <div className="bar-gap" style={{ flex: max - value }} />
          </div>
        </div>
      ))}
    </div >
  );
};