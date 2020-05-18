import React from 'react';
import { Actions, useGlobalState } from '../wrappers/GlobalStateWrapper';

export default () => {
  const { dispatch } = useGlobalState();

  const selectModule = key => dispatch(Actions.SelectModule, key);

  return (
    <div className="menu">
      <ul>
        <li onClick={() => selectModule('dashboard')}>Dashboard</li>
        <li onClick={() => selectModule('fighters')}>Fighters</li>
        <li onClick={() => selectModule('events')}>Events</li>
      </ul>
    </div>
  );
};