import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import { useGlobalState, NotificationTypes } from '../../framework/wrappers/GlobalStateWrapper';
import { useChatState, Actions } from './ChatStateWrapper';
import ChannelPicker from './ChannelPicker';
import ChannelContent from './ChannelContent';
import MessageEntry from './MessageEntry';

export default () => {
  const { dispatchSnapshot } = useChatState();
  const { dispatchNotification } = useGlobalState();

  useEffect(() => {
    const hydrateChannel = raw => ({ ...raw, label: `#${raw.id}` });

    firebase.firestore()
      .collection('channels')
      .onSnapshot(
        dispatchSnapshot(Actions.UpdateChannels, hydrateChannel),
        dispatchNotification(NotificationTypes.Error)
      );
  }, [dispatchSnapshot, dispatchNotification]);

  return (
    <>
      <ChannelPicker />
      <ChannelContent />
      <MessageEntry />
    </>
  );
};
