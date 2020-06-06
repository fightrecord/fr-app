import React from 'react';
import cx from 'classnames';
import SubscriberSummaryStatus from './SubscriberSummaryStatus';
import SubscriberSummaryBasic from './SubscriberSummaryBasic';
import SubscriberSummarySubscription from './SubscriberSummarySubscription';
import SubscriberSummaryPayment from './SubscriberSummaryPayment';
import SubscriberSummaryVendor from './SubscriberSummaryVendor';

export default ({ subscriber }) => {
  const { status } = subscriber;

  return (
    <div className={cx('smartsearch-summary', `status_${status}`)}>
      <div className="row">
        <SubscriberSummaryStatus subscriber={subscriber} />
        <SubscriberSummaryBasic subscriber={subscriber} />
        <SubscriberSummarySubscription subscriber={subscriber} />
        <SubscriberSummaryPayment subscriber={subscriber} />
        <SubscriberSummaryVendor subscriber={subscriber} />
      </div>
    </div>
  )
};