import React from 'react';
import { Icon } from 'react-icons-kit';
import { navicon, search } from 'react-icons-kit/fa';

export default () => (
  <div className="main-header">
    <Icon size={16} icon={navicon} />
    <div className="main-logo" />
    <Icon size={16} icon={search} />
  </div>
);
