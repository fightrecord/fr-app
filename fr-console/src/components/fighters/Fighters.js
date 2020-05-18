import React from 'react';
import cx from 'classnames';
import Report from './Report';
import SmartSearchPage from '../SmartSearchPage';
import FighterSummary from './FighterSummary';
import { loadOrderedFighters, searchOrderedFighters } from '../../services/fighter';

export default ({ className }) => (
  <SmartSearchPage
    className={cx(className, 'fighters')}
    title="Fighters"
    renderRow={(fighter, key) => <FighterSummary key={key} fighter={fighter} />}
    doList={loadOrderedFighters}
    doSearch={searchOrderedFighters}
  >
    <Report />
  </SmartSearchPage>
);