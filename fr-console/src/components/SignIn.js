import React, { useState } from 'react';
import firebase from 'firebase/app';
import Error from './Error';
import Logo from './Logo';
import Spinner from './Spinner';

export default () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState();

  const signIn = () => {
    setIsSigningIn(true);

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then(() => {
        setIsSigningIn(false);
      }).catch(error => {
        setError(error);
        setIsSigningIn(false);
      });
  };

  return (
    <div className="sign-in">
      <Logo />
      <Error error={error} />
      {isSigningIn
        ? <Spinner />
        : (
          <button className="sign-in google" onClick={signIn}>
            Sign in with Google
          </button>
        )}
    </div>
  );
};