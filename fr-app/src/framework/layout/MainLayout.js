import React from 'react';
import Header from './Header';
import Content from './Content';
import Menu from './Menu';

export default ({ modules }) => (
  <div className="main-layout">
    <Header />
    <div className="pages">
      <Menu modules={modules} />
      <Content modules={modules} />
    </div>
  </div>
);
