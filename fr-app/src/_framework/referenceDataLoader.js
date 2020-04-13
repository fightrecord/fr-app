import { useEffect } from 'react';
import firebase from 'firebase/app';
import { useGlobalState, Actions, NotificationTypes } from './wrappers/GlobalStateWrapper';

export default ({ children }) => {
  const { state: { token }, dispatchSnapshot, dispatchNotification } = useGlobalState();

  useEffect(() => {
    if (!token) return;

    const unsubscribers = [];

    unsubscribers.push(firebase.firestore()
      .collection('gyms')
      .onSnapshot(
        dispatchSnapshot(Actions.UpdateGyms),
        dispatchNotification(NotificationTypes.Error)
      ));

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [token]);

  return children;
};