import React from 'react';
import DashboardPanel from './DashboardPanel';
import SubscriptionSummary from './SubscriptionSummary';

export default () => (
  <DashboardPanel className="subscriptions">
    <SubscriptionSummary />
  </DashboardPanel>
);