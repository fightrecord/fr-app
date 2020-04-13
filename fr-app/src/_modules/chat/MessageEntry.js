import React, { useState } from 'react';
import firebase from 'firebase/app';
import { DateTime } from 'luxon';
import { Icon } from 'react-icons-kit';
import { send } from 'react-icons-kit/fa';
import { useGlobalState } from '../../_framework/wrappers/GlobalStateWrapper';

const ENTER_KEY = 13;

export default () => {
  const { state: { currentChannel: { id: channelId } = {}, userId } } = useGlobalState();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    firebase.firestore()
      .collection('channel')
      .doc(channelId)
      .collection('chat')
      .doc()
      .set({
        created: DateTime.utc().toISO(),
        author: userId,
        message
      });

    setMessage('');
  };

  const onKeyUp = ev => {
    if (ev.keyCode !== ENTER_KEY) return;
    sendMessage();
  };

  return (
    <div className="message-entry">
      <input
        value={message}
        placeholder="Enter your message..."
        onChange={ev => setMessage(ev.target.value)}
        onKeyUp={ev => onKeyUp(ev)}
      />
      <Icon size={16} icon={send} onClick={() => sendMessage()} />
    </div>
  );
};
