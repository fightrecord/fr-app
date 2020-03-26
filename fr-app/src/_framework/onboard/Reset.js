import React from 'react';

export default ({
  onComplete = () => null,
  onCancel
}) => {
  const sendResetLink = () => {
    console.log('sendResetLink');
  };

  return (
    <div className="onboard-content reset darkred-red">
      <h1>Reset</h1>
      <div className="row">
        <div className="column">
          <p>
            If you've forgotten your password,
            enter your email below and we'll send you a reset link.
          </p>
          <input type="email" placeholder="Email" />
          <button onClick={() => sendResetLink()}>
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