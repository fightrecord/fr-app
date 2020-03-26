import React from 'react';
import { createButton } from "react-social-login-buttons";
import './FightRecordLoginButton.css';

const config = {
  text: "Fight Record Login",
  icon: () => <div className="logo fightrecord-button" />,
  style: { background: "#c21424" },
  activeStyle: { background: "#9c101e" }
};

export default createButton(config);