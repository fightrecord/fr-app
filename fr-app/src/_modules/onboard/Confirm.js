import React from 'react';

export default ({
  onComplete = () => null,
  onCancel = () => null,
  onSkip = () => null
}) => {

  return (
    <div className="onboard-content confirm darkred-red">
      <h1>All done</h1>
      <div className="row">
        <div className="column">
        </div>
        <div className="column">
        </div>
      </div>
    </div>
  );
};
