import React from 'react';
import firebase from 'firebase/app';

export default ({
  onComplete = () => null
}) => (
    <div className="onboard-content pick-roles white-grey">
      <h1>Pick Roles</h1>
      <div className="row">
        <div className="column">
          Column 1
        </div>
        <div className="column">
          Column 2
          <button className="secondary" onClick={() => firebase.auth().signOut()}>Log out</button>
        </div>
      </div>
    </div>
  );
