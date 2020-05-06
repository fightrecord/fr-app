import React from 'react';
import SmartSearchPage from '../SmartSearchPage';
import EventSummary from './EventSummary';
import { loadOrderedEvents, searchOrderedEvents } from '../../services/event';

export default () => (
  <SmartSearchPage
    className="events"
    title="Events"
    renderRow={(event, key) => <EventSummary key={key} event={event} />}
    doList={loadOrderedEvents}
    doSearch={searchOrderedEvents}
  />
);