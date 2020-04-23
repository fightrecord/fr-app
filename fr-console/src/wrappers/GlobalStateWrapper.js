import React from 'react';
import StateBuilder from '../stateBuilder';

const State = StateBuilder('_console');

export const NotificationTypes = {
  Error: 'error'
};

export const Actions = {
  Notify: 'notify',
  SelectModule: 'select-module',
  SignIn: 'sign-in',
  SignOut: 'sign-out',
  UpdateProfile: 'update-profile',
  UpdateClasses: 'update-classes',
  UpdateEvents: 'update-events',
  UpdateTeams: 'update-teams'
};

export const useGlobalState = State.useStateValue;

export default ({ children }) => {
  const initialState = {
    currentModule: 'dashboard',
    notifications: [],
    profile: null,
    classes: {},
    events: {},
    teams: {}
  };

  const reducer = (state, { type, payload }) => {
    const { notifications } = state;

    switch (type) {
      case Actions.Notify:
        return { ...state, notifications: [...notifications, payload] };
      case Actions.SignIn:
        const { token, claims, roles } = payload;
        return { ...state, token, claims, roles, notifications: [] };
      case Actions.SignOut:
        return { ...state, claims: null, token: null, profile: null };
      case Actions.SelectModule:
        return { ...state, currentModule: payload };
      case Actions.UpdateProfile:
        return { ...state, profile: payload };
      case Actions.UpdateClasses:
        return { ...state, classes: payload };
      case Actions.UpdateEvents:
        return { ...state, events: payload };
      case Actions.UpdateTeams:
        return { ...state, teams: payload };
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