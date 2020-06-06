import React from 'react';
import cx from 'classnames';
import Report from './Report';
import SmartSearchPage from '../SmartSearchPage';
import EventSummary from './EventSummary';
import { loadOrderedEvents, searchOrderedEvents } from '../../services/event';

const orderOptions = {
  'Modified Time': '_meta.modified',
  'Data Quality': '_quality.score',
  Name: 'name'
};

export default ({ className, isSelected }) => (
  <SmartSearchPage
    className={cx(className, 'events', { selected: isSelected })}
    title="Events"
    renderRow={(event, key) => <EventSummary key={key} event={event} />}
    doList={loadOrderedEvents}
    doSearch={searchOrderedEvents}
    orderOptions={orderOptions}
  >
    <Report />
  </SmartSearchPage>
);