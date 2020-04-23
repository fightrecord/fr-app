import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Fighters from './Fighters';

export default () => (
  <div className="console">
    <Header />
    <div className="content">
      <Menu />
      <div className="pages">
        <Fighters />
      </div>
    </div>
  </div>
);