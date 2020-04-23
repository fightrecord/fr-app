import { useEffect } from 'react';
import firebase from 'firebase/app';
import { useGlobalState, NotificationTypes } from '../wrappers/GlobalStateWrapper';

export default ({ children }) => {
  const { dispatchSnapshot, dispatchNotification } = useGlobalState();

  useEffect(() => {
    firebase.firestore()
      .collection('classes')
      .onSnapshot(
        dispatchSnapshot('update-classes'),
        dispatchNotification(NotificationTypes.Error)
      );

    firebase.firestore()
      .collection('events')
      .onSnapshot(
        dispatchSnapshot('update-events'),
        dispatchNotification(NotificationTypes.Error)
      );

    firebase.firestore()
      .collection('teams')
      .onSnapshot(
        dispatchSnapshot('update-teams'),
        dispatchNotification(NotificationTypes.Error)
      );
  }, [dispatchSnapshot, dispatchNotification]);

  return children;
};