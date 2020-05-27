import React, { useState } from 'react';
import firebase from 'firebase/app';
import { validEmail } from '../../framework/validators';
import Error from '../../framework/common/Error';

export default ({
  onComplete = () => null,
  onCancel
}) => {
  const [error, setError] = useState();
  const [email, setEmail] = useState();

  const sendResetLink = () => firebase.auth()
    .sendPasswordResetEmail(email)
    .then(() => onComplete())
    .catch(error => setError(error));

  const canReset = email && validEmail(email)

  return (
    <div className="onboard-content reset darkred-red">
      <h1>Reset</h1>
      <div className="row">
        <div className="column">
          <p>
            If you've forgotten your password,
            enter your email below and we'll send you a reset link.
          </p>
          <input type="email" placeholder="Email" onChange={ev => setEmail(ev.target.value)} />
          <Error error={error} />
          <button onClick={() => sendResetLink()} disabled={!canReset}>
            Send me the link
          </button>
          <button className="secondary" onClick={onCancel}>
            I remembered my sign in details.
          </button>
        </div>
      </div>
    </div>
  );
};