import React, { useState } from 'react';
import firebase from 'firebase/app';
import { validEmail, validPassword } from '../validators';
import Error from '../common/Error';

export default ({
  onComplete = () => null,
  onCancel
}) => {
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const register = () => firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => onComplete())
    .catch(error => setError(error));

  const canRegister = email
    && password
    && passwordCheck
    && validEmail(email)
    && validPassword(password)
    && password === passwordCheck;

  return (
    <div className="onboard-content register red-grey">
      <h1>Register</h1>
      <div className="row">
        <div className="column">
          <p>
            We only need a few details from you for now,
            please enter your email address and a password to create your account.
          </p>
          <input type="email" placeholder="Email" onChange={ev => setEmail(ev.target.value)} />
        </div>
        <div className="column">
          <input type="password" placeholder="New Password" onChange={ev => setPassword(ev.target.value)} />
          <input type="password" placeholder="Confirm Password" onChange={ev => setPasswordCheck(ev.target.value)} />
          <p className="small">
            Passwords should contain six characters or more and have at least one lowercase and one uppercase alphabetical character or has at least one lowercase and one numeric character or has at least one uppercase and one numeric character.
          </p>
          <Error error={error} />
          <div className="buttons">
            {onCancel && <button className="secondary" onClick={onCancel}>Cancel</button>}
            <button onClick={() => register()} disabled={!canRegister}>
              Register
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}