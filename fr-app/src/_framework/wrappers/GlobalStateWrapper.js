import React from 'react';
import { StorageKeys } from '../constants';
import StateBuilder from '../stateBuilder';

const State = StateBuilder('_global');

export const NotificationTypes = {
  Error: 'error'
};

export const Actions = {
  Notify: 'notify',
  SelectModule: 'select-module',
  SignIn: 'sign-in',
  SignOut: 'sign-out',
  UpdateGyms: 'update-gyms',
  UpdateProfile: 'update-profile'
};

export const useGlobalState = State.useStateValue;

export default ({ children }) => {
  const initialState = {
    currentModule: localStorage.getItem(StorageKeys.CurrentModule) || 'home',
    notifications: [],
    profile: null
  };

  const reducer = (state, { type, payload }) => {
    const { notifications } = state;

    switch (type) {
      case Actions.Notify:
        return { ...state, notifications: [...notifications, payload] };
      case Actions.SignIn:
        const { token, claims } = payload;
        return { ...state, token, claims, notifications: [] };
      case Actions.SignOut:
        return { ...state, claims: null, token: null, profile: null };
      case Actions.SelectModule:
        return { ...state, currentModule: payload };
      case Actions.UpdateGyms:
        return { ...state, gyms: payload };
      case Actions.UpdateProfile:
        return { ...state, profile: payload };
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