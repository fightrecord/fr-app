import React from 'react';
import DataPanel from './DataPanel';
import Page from '../Page';
import SubscriptionPanel from './SubscriptionPanel';

export default ({ isSelected }) => (
  <Page className="dashboard" isSelected={isSelected}>
    <DataPanel />
    <SubscriptionPanel />
  </Page>
);