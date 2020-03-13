import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

export default ({ modules }) => (
  <div className="main-layout">
    <Header />
    <Content modules={modules} />
    <Footer modules={modules} />
  </div>
);
