import React from 'react';

export default ({
  onComplete = () => null,
  onCancel = () => null
}) => {

  return (
    <div className="onboard-content display-name darkred-white">
      <h1>Your Name</h1>
      <div className="row">
        <div className="column">
        </div>
        <div className="column">
          <button className="secondary" onClick={() => onCancel()}>Back</button>
        </div>
      </div>
    </div>
  );
};
