import React from 'react';
import { commentingO } from 'react-icons-kit/fa';
import Chat from './Chat';
import './default.css';

const render = () => (
  <div className="chat-content">
    <Chat />
  </div>
);

export default {
  key: 'chat',
  label: 'Chat',
  render,
  icon: commentingO,
  inMenu: true
};
