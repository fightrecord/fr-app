import React from 'react';
import { DateTime } from 'luxon';
import StateBuilder from './stateBuilder';
import { StorageKeys } from './constants';
import './theme/default';

import AuthenticationWrapper from './wrappers/AuthenticationWrapper';
import ConfigurationWrapper from './wrappers/ConfigurationWrapper';
import MainLayout from './layout/MainLayout';

const State = StateBuilder('_framework');

export const useFrameworkState = State.useStateValue;

export default ({ modules }) => {
  const initialState = {
    userId: `User ${DateTime.utc().toFormat('ss')}`,
    currentModule: localStorage.getItem(StorageKeys.CurrentModule) || 'home',
    channels: {},
    currentChannel: {}
  };

  const reducer = (state, { type, payload }) => {
    const { currentChannel } = state;

    switch (type) {
      case 'select-module':
        return { ...state, currentModule: payload };
      case 'load-channels':
        return {
          ...state,
          channels: payload,
          currentChannel: currentChannel.id || payload[Object.keys(payload)[0]]
        };
      case 'select-channel':
        return { ...state, currentChannel: payload };
      default:
        return state;
    }
  };

  const options = {
    modules
  };

  return (
    <State.StateProvider initialState={initialState} reducer={reducer}>
      <ConfigurationWrapper>
        <AuthenticationWrapper>
          <MainLayout {...options} />
        </AuthenticationWrapper>
      </ConfigurationWrapper>
    </State.StateProvider>
  );
};