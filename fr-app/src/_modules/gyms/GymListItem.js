import React from 'react';
import { Icon } from 'react-icons-kit';
import { check } from 'react-icons-kit/fa';

export default ({
  gym = {},
  icon,
  onClick = () => null
}) => {
  const { name, verified } = gym;

  return (
    <div className="gym-list-item" onClick={() => onClick(gym)} >
      <div className="name">
        {name} {verified && <Icon icon={check} size={10} />}
      </div>
      {icon && <Icon icon={icon} size={16} />}
    </div>
  );
};