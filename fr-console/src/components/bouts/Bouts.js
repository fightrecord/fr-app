import React from 'react';
import BoutSummary from './BoutSummary';

export default ({ bouts, fighterId }) => {

  const sortOpponentAscending = ({ fighters: a }, { fighters: b }) => {
    const filterThis = ({ id }) => id !== fighterId;

    const { name: nameA } = a.filter(filterThis)[0];
    const { name: nameB } = b.filter(filterThis)[0];

    return nameA.localeCompare(nameB);
  };

  return (
    <div className="bouts">
      {bouts
        .sort(sortOpponentAscending)
        .map((bout, key) => (
          <BoutSummary key={key} bout={bout} fighterId={fighterId} />
        ))}
      {bouts.length < 1 && <p>No bouts recorded for this fighter</p>}
    </div>
  );
};