import React from 'react';

export default ({
  onRegister = () => null,
  onComplete = () => null,
  onReset = () => null,
  onCancel
}) => (
    <div className="onboard-content signin grey-darkred">
      <h1>Login</h1>
      <div className="row">
        <div className="column">
          <p>
            If you've visited us before,
            please enter your email and password below.
          </p>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button onClick={onComplete}>
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
