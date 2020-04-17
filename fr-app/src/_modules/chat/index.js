import React from 'react';
import { commentingO } from 'react-icons-kit/fa';
import ChatStateWrapper from './ChatStateWrapper';
import Chat from './Chat';
import './default.css';

const render = () => (
  <ChatStateWrapper>
    <div className="chat-content">
      <Chat />
    </div>
  </ChatStateWrapper>
);

export default {
  key: 'chat',
  label: 'Chat',
  render,
  icon: commentingO,
  inMenu: true
};
