import React from 'react';
import { home } from 'react-icons-kit/fa';
import RssFeed from './RssFeed';
import './default.css';
import './console.css';

const render = () => (
  <div className="home-content">
    <RssFeed feedUrl="https://fightrecord.co.uk/feed/" />
  </div>
);

export default {
  key: 'home',
  label: 'Home',
  render,
  icon: home,
  inMenu: true
};
