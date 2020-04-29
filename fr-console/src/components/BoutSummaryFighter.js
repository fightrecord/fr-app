import React from 'react';

export default ({ bout, fighterId }) => {
  const { fighters } = bout;
  const opponent = fighters.find(f => f.id !== fighterId);
  const { name, teamName } = opponent || {};

  return (
    <div className="info fighter">
      <h1>{name}</h1>
      <h2>{teamName || ''}</h2>
    </div>
  );
};