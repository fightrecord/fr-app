import React from 'react';
import GymListItem from './GymListItem';

export default ({
  itemIcon, gyms = {},
  onSelect = () => null,
  className,
  showEmpty = false
}) => {
  const list = Object.values(gyms)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={className || 'gym-list'}>

      {list && list.length > 0 && list.map((gym, key) => (
        <GymListItem
          key={key}
          gym={gym}
          icon={itemIcon}
          onClick={onSelect}
        />
      ))}

      {showEmpty && !list.length && (
        <div className="gym-list-empty">No Gyms selected</div>
      )}
    </div>
  );
};

