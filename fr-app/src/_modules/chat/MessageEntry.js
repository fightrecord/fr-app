import React, { useState } from 'react';
import firebase from 'firebase/app';
import { DateTime } from 'luxon';
import { Icon } from 'react-icons-kit';
import { send } from 'react-icons-kit/fa';
import { useGlobalState } from '../../_framework/wrappers/GlobalStateWrapper';
import { useChatState } from './ChatStateWrapper';

const ENTER_KEY = 13;

export default () => {
  const { state: { claims: { user_id, name } } } = useGlobalState();
  const { state: { currentChannel: { id: channelId } = {} } } = useChatState();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    firebase.firestore()
      .collection('channels')
      .doc(channelId)
      .collection('messages')
      .doc()
      .set({
        created: DateTime.utc().toISO(),
        author: name,
        authorId: user_id,
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
