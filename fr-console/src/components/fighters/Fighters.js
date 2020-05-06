import React from 'react';
import SmartSearchPage from '../SmartSearchPage';
import FighterSummary from './FighterSummary';
import { loadOrderedFighters, searchOrderedFighters } from '../../services/fighter';

export default () => (
  <SmartSearchPage
    className="fighters"
    title="Fighters"
    renderRow={(fighter, key) => <FighterSummary key={key} fighter={fighter} />}
    doList={loadOrderedFighters}
    doSearch={searchOrderedFighters}
  />
);