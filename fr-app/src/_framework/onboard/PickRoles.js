import React from 'react';
import firebase from 'firebase/app';

export default ({
  onComplete = () => null,
  onCancel
}) => (
    <div className="onboard-content pick-roles white-grey">
      <h1>Pick Roles</h1>
      <div className="row">
        <div className="column">
          Column 1
        </div>
        <div className="column">
          Column 2
          {onCancel && <button className="secondary" onClick={onCancel}>Cancel</button>}
          <button className="secondary" onClick={() => firebase.auth().signOut()}>Log out</button>
        </div>
      </div>
    </div>
  );
