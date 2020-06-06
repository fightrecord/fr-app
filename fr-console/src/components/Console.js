import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Dashboard from './dashboard';
import Events from './events';
import Fighters from './fighters';
import Subscribers from './subscribers';
import { useGlobalState } from '../wrappers/GlobalStateWrapper';

export default () => {
  const { state: { currentModule } } = useGlobalState();

  return (
    <div className="console">
      <Header />
      <div className="content">
        <Menu />
        <div className="pages">
          <Dashboard isSelected={currentModule === 'dashboard'} />
          <Fighters isSelected={currentModule === 'fighters'} />
          <Events isSelected={currentModule === 'events'} />
          <Subscribers isSelected={currentModule === 'subscribers'} />
        </div>
      </div>
    </div>
  );
};