import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import { useGlobalState } from '../../_framework/wrappers/GlobalStateWrapper';
import ChannelPicker from './ChannelPicker';
import ChannelContent from './ChannelContent';
import MessageEntry from './MessageEntry';

export default () => {
  const { dispatchSnapshot } = useGlobalState();

  useEffect(() => {
    firebase.firestore()
      .collection('channels')
      .onSnapshot(dispatchSnapshot('load-channels', (channel, id) => ({
        ...channel,
        id,
        label: `#${id}`
      })));
  }, [dispatchSnapshot]);

  return (
    <>
      <ChannelPicker />
      <ChannelContent />
      <MessageEntry />
    </>
  );
};
