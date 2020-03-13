import React from 'react';
import { user } from 'react-icons-kit/fa';

const render = () => (
  <div className="profile-content">
    Profile Content
  </div>
);

export default {
  key: 'profile',
  label: 'Your Profile',
  render,
  icon: user,
  inFooter: true
};
