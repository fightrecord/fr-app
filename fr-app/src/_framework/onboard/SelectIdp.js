import React, { useState } from 'react';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton
} from "react-social-login-buttons";
import firebase from 'firebase/app';
import Error from '../../_framework/common/Error';
import Spinner from '../../_framework/common/Spinner';
import FightRecordLoginButton from './FightRecordLoginButton';

const idpProps = {
  style: {
    fontSize: '0.8rem',
    height: '40px'
  },
  iconSize: '20px',
};

export default ({
  onSignIn = () => null,
  onComplete = () => null
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState();

  const onIdpSignIn = () => {
    setIsSigningIn(true);

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then(result => {
        setIsSigningIn(false);
      }).catch(error => {
        setError(error);
        setIsSigningIn(false);
      });
  };

  return (
    <div className="onboard-content selectidp red-grey">
      <h1>Welcome...</h1>
      <div className="row">
        <div className="column">
          <p>
            Fight Record offers exclusive content.
            In order to access this content you will need to sign in or register.
          </p>
          {isSigningIn
            ? <Spinner />
            : <FightRecordLoginButton onClick={onSignIn} />}
        </div>
        <div className="column">
          <p>
            Signing in is easy,
            you can even use one of your social media accounts to speed things up.
          </p>
          <Error error={error} />
          <div className="idps">
            {isSigningIn
              ? <Spinner />
              : <>
                <FacebookLoginButton {...idpProps} />
                <GoogleLoginButton {...idpProps} onClick={() => onIdpSignIn('google')} />
                <MicrosoftLoginButton {...idpProps} />
                <TwitterLoginButton {...idpProps} />
              </>}
          </div>
        </div>
      </div>
    </div>
  );
};