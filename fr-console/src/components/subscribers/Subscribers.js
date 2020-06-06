import React from 'react';
import cx from 'classnames';
import Report from './Report';
import SmartSearchPage from '../SmartSearchPage';
import SubscriberSummary from './SubscriberSummary';
import { loadOrderedSubscribers, searchOrderedSubscribers } from '../../services/subscriber';

const orderOptions = {
  'Last Paid': 'paidAt',
  'Email Address': 'emailAddress'
};

export default ({ className, isSelected }) => (
  <SmartSearchPage
    className={cx(className, 'subscribers', { selected: isSelected })}
    title="Subscribers"
    renderRow={(subscriber, key) => <SubscriberSummary key={key} subscriber={subscriber} />}
    doList={loadOrderedSubscribers}
    doSearch={searchOrderedSubscribers}
    orderOptions={orderOptions}
    searchOrder="emailAddress"
  >
    <Report />
  </SmartSearchPage>
);