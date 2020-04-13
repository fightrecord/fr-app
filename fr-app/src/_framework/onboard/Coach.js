import React from 'react';

export default ({
  onComplete = () => null,
  onCancel = () => null,
  onSkip = () => null
}) => {

  return (
    <div className="onboard-content coach red-grey">
      <h1>You're a Coach...</h1>
      <div className="row">
        <div className="column">
        </div>
        <div className="column">
          <button className="secondary" onClick={() => onCancel()}>Back</button>
          <button className="secondary" onClick={() => onSkip()}>Skip</button>
        </div>
      </div>
    </div>
  );
};
