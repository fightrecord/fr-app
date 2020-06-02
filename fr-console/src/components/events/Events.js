import React from 'react';
import cx from 'classnames';
import Report from './Report';
import SmartSearchPage from '../SmartSearchPage';
import EventSummary from './EventSummary';
import { loadOrderedEvents, searchOrderedEvents } from '../../services/event';

export default ({ className, isSelected }) => (
  <SmartSearchPage
    className={cx(className, 'events', { selected: isSelected })}
    title="Events"
    renderRow={(event, key) => <EventSummary key={key} event={event} />}
    doList={loadOrderedEvents}
    doSearch={searchOrderedEvents}
  >
    <Report />
  </SmartSearchPage>
);