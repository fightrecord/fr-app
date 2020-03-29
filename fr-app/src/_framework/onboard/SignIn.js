import React, { useState } from 'react';
import firebase from 'firebase/app';
import { validEmail } from '../validators';
import Error from '../common/Error';

export default ({
  onRegister = () => null,
  onComplete = () => null,
  onReset = () => null,
  onCancel
}) => {
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const canSignIn = email
    && password
    && validEmail(email)
    && password.length >= 4;

  const signIn = () => firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => setError(error));

  return (
    <div className="onboard-content signin grey-darkred">
      <h1>Login</h1>
      <div className="row">
        <div className="column">
          <p>
            If you've visited us before,
            please enter your email and password below.
          </p>
          <input type="email" placeholder="Email" onChange={ev => setEmail(ev.target.value)} />
          <input type="password" placeholder="Password" onChange={ev => setPassword(ev.target.value)} />
          <Error error={error} />
          <button onClick={() => signIn()} disabled={!canSignIn}>
            Sign In
          </button>
          <button className="secondary" onClick={onReset}>
            I've forgotten my sign in details.
          </button>
        </div>
        <div className="column">
          <p>
            If you're new to Fight Record then you will need to register to continue.
            </p>
          <button onClick={onRegister}>Register Now</button>
          {onCancel && <button className="secondary" onClick={onCancel}>Login using another provider</button>}
        </div>
      </div>
    </div>
  );
};