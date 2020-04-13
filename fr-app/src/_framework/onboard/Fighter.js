import React from 'react';
import FightRecord from '../common/FightRecord';
import GymList from '../common/GymList';
import GymSelector from '../common/GymSelector';

export default ({
  onComplete = () => null,
  onCancel = () => null,
  onSkip = () => null
}) => {
  const canNext = false

  return (
    <div className="onboard-content fighter darkred-red">
      <h1>You're a Fighter</h1>
      <div className="row">
        <div className="column">
          <p>
            Please tell us a little about your fighter profile.
            We'd love to know about the Gyms you train at and your Fight Record?
            </p>
          <GymSelector />
          <GymList />
          <FightRecord label="Novice/Amateur Record" editable />
          <FightRecord label="Professional Record" editable />
          <button className="primary" onClick={() => onComplete()} disabled={!canNext}>Next</button>
        </div>
        <div className="column">
          <button className="secondary" onClick={() => onCancel()}>Back</button>
          <button className="secondary" onClick={() => onSkip()}>Skip</button>
        </div>
      </div>
    </div>
  );
};
