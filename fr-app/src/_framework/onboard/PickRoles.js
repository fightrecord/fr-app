import React, { useState } from 'react';
import SelectionButton from './SelectionButton';

export default ({
  allRoles = [],
  onComplete = () => null,
  onSkip = () => null,
  onCancel = () => null
}) => {

  const defaultState = Object.values(allRoles)
    .reduce((acc, { key }) => ({ ...acc, [key]: false }), {});

  const [roles, setRoles] = useState(defaultState);

  const toggleRole = key => () => setRoles({ ...roles, [key]: !roles[key] });
  const canNext = Object.values(roles).reduce((acc, role) => acc || role, false);

  return (
    <div className="onboard-content pick-roles grey-darkred">
      <h1>About You</h1>
      <div className="row">
        <div className="column">
          <p>In order for us to customise your experience,
          we need you to tell us a little bit about yourself.</p>
          <h2>I'm...</h2>
          {allRoles.map(({ key, label }) => (
            <SelectionButton
              key={key}
              label={label}
              checked={roles[key]}
              onToggle={toggleRole(key)}
            />
          ))}
          <button className="primary" onClick={() => onComplete(roles)} disabled={!canNext}>Next</button>
        </div>
        <div className="column">
          <p className="small">This information won't be shared with anyone,
            without your expressed permission.For more information you can see our <a href="https://fightrecord.co.uk/privacy">privacy policy</a>.</p>
          <button className="secondary" onClick={() => onSkip()}>Skip</button>
          <button className="secondary" onClick={() => onCancel()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
