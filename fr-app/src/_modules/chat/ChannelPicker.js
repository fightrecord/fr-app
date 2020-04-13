import React, { useState } from 'react';
import cx from 'classnames';
import { Icon } from 'react-icons-kit';
import { caretDown, caretUp, plusSquare } from 'react-icons-kit/fa';
import { useGlobalState } from '../../_framework/wrappers/GlobalStateWrapper';

export default () => {
  const { state: { channels = {}, currentChannel = {} }, dispatch } = useGlobalState();
  const [isPicking, setIsPicking] = useState(false);
  const [, setAddChannel] = useState(false);

  const selectChannel = channel => {
    dispatch('select-channel', channel);
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
          .filter(({ id }) => id !== currentChannel.id)
          .map(([id, channel]) => {
            const { isPrivate, label } = channel;
            return (
              <div
                key={id}
                className={cx('channel', { private: isPrivate })}
                onClick={() => selectChannel(channel)}
              >
                {label}
              </div>
            );
          })}
      </div>
    </div>
  );
};
