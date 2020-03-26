import React from 'react';

export default ({
  onComplete = () => null,
  onCancel
}) => (
    <div className="onboard-content register red-white">
      <h1>Register</h1>
      <div className="row">
        <div className="column">
          Column 1
        </div>
        <div className="column">
          Column 2
          {onCancel && <button className="secondary" onClick={onCancel}>Cancel registration</button>}
        </div>
      </div>
    </div>
  );
