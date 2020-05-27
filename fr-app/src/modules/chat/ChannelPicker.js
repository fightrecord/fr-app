import React, { useState } from 'react';
import cx from 'classnames';
import { Icon } from 'react-icons-kit';
import { caretDown, caretUp, plusSquare } from 'react-icons-kit/fa';
import { useChatState, Actions } from './ChatStateWrapper';

export default () => {
  const { state: { channels = {}, currentChannel = {} }, dispatch } = useChatState();
  const [isPicking, setIsPicking] = useState(false);
  const [, setAddChannel] = useState(false);

  const selectChannel = channel => {
    dispatch(Actions.SelectChannel, channel);
    setIsPicking(false);
  };

  return (
    <div className="channel-picker">
      <div className="current" onClick={() => setIsPicking(!isPicking)}>
        <p>{currentChannel.label}</p>
        <Icon size={24} icon={isPicking ? caretUp : caretDown} />
      </div>
      <div className={cx('options', { expanded: isPicking })}>
        <div className="title">
          <h4>Channels</h4>
          <Icon size={24} icon={plusSquare} onClick={() => setAddChannel(true)} />
        </div>
        {Object.entries(channels)
          .filter(([id]) => id !== currentChannel.id)
          .map(([id, channel]) => (
            <div
              key={id}
              className={cx('channel', { private: channel.isPrivate })}
              onClick={() => selectChannel(channel)}
            >
              {channel.label}
            </div>
          ))}
      </div>
    </div>
  );
};
