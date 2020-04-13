import React from 'react';

export default ({
  onComplete = () => null,
  onCancel = () => null,
  onSkip = () => null
}) => {

  return (
    <div className="onboard-content promoter grey-darkred">
      <h1>You're a Promoter...</h1>
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
