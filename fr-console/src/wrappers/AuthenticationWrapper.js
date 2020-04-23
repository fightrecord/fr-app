import { useEffect } from 'react';
import firebase from 'firebase/app';
import { Actions, NotificationTypes, useGlobalState } from './GlobalStateWrapper';

export default ({
  children,
  renderSignIn = () => null
}) => {
  const { state: { profile }, dispatch, dispatchNotification } = useGlobalState();

  useEffect(() => {

    const signIn = (token, claims, roles) => dispatch(Actions.SignIn, { claims, token, roles });
    const updateProfile = profile => dispatch(Actions.UpdateProfile, profile);
    const signOut = () => firebase.auth().signOut();

    const subscribeToProfile = userId => firebase.firestore()
      .collection('profiles')
      .where('owners', 'array-contains', userId)
      .limit(1)
      .onSnapshot(snap => {
        const profile = snap.docs && snap.docs[0] && snap.docs[0].data();
        updateProfile(profile);
      });

    const loadAccessRights = userId => firebase.firestore()
      .collection('access')
      .doc(userId)
      .get();

    const onError = err => {
      dispatchNotification(NotificationTypes.Error)(err);
      signOut();
    };

    const onFirebaseAuthChanged = authResult => {
      let unsubscribeProfile;

      if (authResult) {
        authResult.getIdTokenResult()
          .then(({ claims, token }) => {
            const { user_id } = claims;
            console.log("Subscribing to profile");
            unsubscribeProfile = subscribeToProfile(user_id);
            loadAccessRights(user_id)
              .then(access => {
                const roles = access.data().roles;
                if (roles && roles.indexOf('console') >= 0) signIn(token, claims, roles);
                else onError(`You need the 'console' role to access this console.`);
              });
          }).catch(onError);
      } else {
        console.log("Unsubscribing from profile");
        if (unsubscribeProfile) unsubscribeProfile();
        dispatch(Actions.SignOut);
      }
    };

    console.log("Subscribing to authentication");
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(
      onFirebaseAuthChanged,
      dispatchNotification(NotificationTypes.Error)
    );

    return () => {
      console.log("Unsubscribing from authentication");
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, [dispatch, dispatchNotification]);

  const signin = renderSignIn();

  return profile ? children : signin;
};
