import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Events from './events';
import Fighters from './fighters';

export default () => (
  <div className="console">
    <Header />
    <div className="content">
      <Menu />
      <div className="pages">
        {/*Fighters />*/}
        <Events />
      </div>
    </div>
  </div>
);