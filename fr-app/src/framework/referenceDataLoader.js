import { useEffect } from 'react';
import firebase from 'firebase/app';
import { useGlobalState, Actions, NotificationTypes } from './wrappers/GlobalStateWrapper';

export default ({ children }) => {
  const { state: { token }, dispatchSnapshot, dispatchNotification } = useGlobalState();

  useEffect(() => {
    if (!token) return;

    const unsubscribers = [];
    console.log("Subscribing to reference data");

    unsubscribers.push(firebase.firestore()
      .collection('gyms')
      .onSnapshot(
        dispatchSnapshot(Actions.UpdateGyms),
        dispatchNotification(NotificationTypes.Error)
      ));

    return () => {
      console.log("Unsubscribing from reference data");
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [token, dispatchSnapshot, dispatchNotification]);

  return children;
};