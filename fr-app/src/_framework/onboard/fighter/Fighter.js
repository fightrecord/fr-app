import React, { useState } from 'react';
import Stepper from '../../common/Stepper';
import Gyms from '../Gyms';
import ProfessionalRecord from './ProfessionalRecord';
import AmateurRecord from './AmateurRecord';
import Consent from './Consent';

export default ({
  onComplete = () => null,
  onCancel = () => null
}) => {
  const [fighter, setFighter] = useState({});
  const complete = () => onComplete(fighter);
  const updateField = field => data => setFighter({ ...fighter, [field]: data });

  const steps = [
    <Gyms onChange={updateField('gyms')} label="Which Gyms do you fight out of?" />,
    <ProfessionalRecord onChange={updateField('professionalRecord')} />,
    <AmateurRecord onChange={updateField('amateurRecord')} />,
    <Consent onChange={updateField('consent')} />
  ];

  return (
    <div className="onboard-content fighter darkred-red">
      <h1>You're a Fighter</h1>
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
