import { useEffect } from 'react';
import firebase from 'firebase/app';
import { Actions, NotificationTypes, useGlobalState } from './GlobalStateWrapper';

export default ({
  children,
  renderOnboarder = () => null
}) => {
  const { state: { profile }, dispatch, dispatchNotification } = useGlobalState();

  useEffect(() => {

    const signIn = (token, claims) => dispatch(Actions.SignIn, { claims, token });
    const updateProfile = profile => dispatch(Actions.UpdateProfile, profile);
    const signOut = () => firebase.auth().signOut();

    const unsubscribers = [];

    const subscribeToProfile = userId => firebase.firestore()
      .collection('profiles')
      .where('owners', 'array-contains', userId)
      .limit(1)
      .onSnapshot(snap => {
        const profile = snap.docs && snap.docs[0] && snap.docs[0].data();
        updateProfile(profile);
      });

    const onError = err => {
      dispatchNotification(NotificationTypes.Error)(err);
      signOut();
    };

    const onFirebaseAuthChanged = authResult => {
      if (authResult) {
        authResult.getIdTokenResult()
          .then(({ claims, token }) => {
            const { user_id } = claims;
            unsubscribers.push(subscribeToProfile(user_id));
            signIn(token, claims);
          }).catch(onError);
      } else {
        dispatch(Actions.SignOut);
      }
    };

    unsubscribers.push(firebase.auth().onAuthStateChanged(
      onFirebaseAuthChanged,
      dispatchNotification(NotificationTypes.Error)
    ));

    return () => unsubscribers.forEach(unsubscribe => {
      unsubscribe();
    });
  }, [dispatch, dispatchNotification]);

  return profile ? children : renderOnboarder();
};
