import React from 'react';
import cx from 'classnames';
import Report from './Report';
import SmartSearchPage from '../SmartSearchPage';
import FighterSummary from './FighterSummary';
import { loadOrderedFighters, searchOrderedFighters } from '../../services/fighter';

export default ({ className, isSelected }) => (
  <SmartSearchPage
    className={cx(className, 'fighters', { selected: isSelected })}
    title="Fighters"
    renderRow={(fighter, key) => <FighterSummary key={key} fighter={fighter} />}
    doList={loadOrderedFighters}
    doSearch={searchOrderedFighters}
  >
    <Report />
  </SmartSearchPage>
);