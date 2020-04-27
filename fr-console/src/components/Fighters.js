import React, { useCallback, useEffect, useState } from 'react';
import FighterSummary from './FighterSummary';
import { loadRecentFighters } from '../services/fighter';

export default () => {
  const [fighters, setFighters] = useState([]);

  const loadFighters = useCallback(() => {
    loadRecentFighters().then(setFighters);
  }, []);

  useEffect(loadFighters, [loadFighters]);

  return (
    <div className="page fighters">
      <div className="title">
        <h1>Fighters</h1>
      </div>
      <div className="list">
        <div className="scroller">
          {fighters.map(fighter => <FighterSummary key={fighter._id} fighter={fighter} />)}
        </div>
      </div>
    </div>
  );
};