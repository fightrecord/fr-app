import React, { useState } from 'react';
import Stepper from '../../../framework/common/Stepper';
import Gyms from '../Gyms';
import Consent from './Consent';

export default ({
  onComplete = () => null,
  onCancel = () => null
}) => {
  const [coach, setCoach] = useState({});
  const complete = () => onComplete(coach);
  const updateField = field => data => setCoach({ ...coach, [field]: data });

  const steps = [
    <Gyms onChange={updateField('gyms')} label="Which Gyms do you coach at?" />,
    <Consent onChange={updateField('consent')} />
  ];

  return (
    <div className="onboard-content coach darkred-red">
      <h1>You're a Coach</h1>
      <div className="row">
        <div className="column">
          <p>Please tell us a little bit more.</p>
        </div>
        <div className="column">
          <Stepper
            steps={steps}
            onComplete={complete}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};
