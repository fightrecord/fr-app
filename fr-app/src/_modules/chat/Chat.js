import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import { useFrameworkState } from '../../_framework';
import ChannelPicker from './ChannelPicker';
import ChannelContent from './ChannelContent';
import MessageEntry from './MessageEntry';

export default () => {
  const [, , dispatchSnapshot] = useFrameworkState();

  useEffect(() => {
    firebase.firestore()
      .collection('channel')
      .onSnapshot(dispatchSnapshot('load-channels', (channel, id) => ({
        ...channel,
        id,
        label: `#${id}`
      })));
  }, []);

  return (
    <>
      <ChannelPicker />
      <ChannelContent />
      <MessageEntry />
    </>
  );
};
