import React from 'react';
import StateBuilder from '../../framework/stateBuilder';

const State = StateBuilder('chat');

export const Actions = {
  UpdateChannels: 'update-channels',
  SelectChannel: 'select-channel'
};

export const useChatState = State.useStateValue;

export default ({ children }) => {
  const initialState = {
    channels: {}
  };

  const reducer = (state, { type, payload }) => {
    const { currentChannel } = state;

    switch (type) {
      case Actions.UpdateChannels:
        const selected = currentChannel ? currentChannel : Object.values(payload)[0];
        return { ...state, channels: payload, currentChannel: selected };
      case Actions.SelectChannel:
        return { ...state, currentChannel: payload };
      default:
        return state;
    }
  };

  return (
    <State.StateProvider initialState={initialState} reducer={reducer}>
      {children}
    </State.StateProvider>
  );
};