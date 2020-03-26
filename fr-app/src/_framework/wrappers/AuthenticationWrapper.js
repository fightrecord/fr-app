import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useFrameworkState } from '..';

export default ({
  children,
  renderOnboarder = () => null
}) => {
  const [, dispatch] = useFrameworkState();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => firebase.auth().onAuthStateChanged(result => {

    const logout = () => dispatch('user-changed', { user: null, token: null });

    if (result) {
      result.getIdTokenResult()
        .then(({ claims, token }) => dispatch('user-changed', { user: claims, token }))
        .catch(() => logout());
    } else logout();
  }), [dispatch]);

  return authenticated ? children : renderOnboarder();
};
