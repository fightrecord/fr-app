import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { DateTime } from 'luxon';
import firebase from 'firebase/app';
import { Icon } from 'react-icons-kit';
import { commentingO, user } from 'react-icons-kit/fa';
import { useGlobalState } from '../../_framework/wrappers/GlobalStateWrapper';

export default () => {
  const { state: { currentChannel: { id: channelId } = {}, userId } } = useGlobalState();
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (false || !channelId) return;

    firebase.firestore()
      .collection('channel')
      .doc(channelId)
      .collection('chat')
      .onSnapshot(snap => {
        const entries = [];

        snap.docs.forEach(doc => entries.push({
          ...doc.data(),
          id: doc.id,
        }));

        setChat(entries
          .sort((a, b) => b.created.localeCompare(a.created))
          .map(entry => ({
            ...entry,
            created: DateTime.fromISO(entry.created)
          })));
      });
  }, [channelId]);

  return (
    <div className="channel-content">
      {chat.length < 1 && (
        <div className="empty">
          <Icon size={48} icon={commentingO} />
          <p>This channel is empty</p>
        </div>
      )}
      {chat.map(({ author, created, id, message }) => (
        <div className={cx('chat-entry', { mine: author === userId })} key={id}>
          <div className="avatar">
            <Icon size={24} icon={user} />
          </div>
          <div className="content">
            <div className="meta">
              {author}
              <span className="time">{created.toFormat('HH:mm')}</span>
            </div>
            <div className="message">
              {message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
