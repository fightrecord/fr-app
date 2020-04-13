import React from 'react';
import GlobalStateWrapper from './wrappers/GlobalStateWrapper';
import ConfigurationWrapper from './wrappers/ConfigurationWrapper';
import AuthenticationWrapper from './wrappers/AuthenticationWrapper';
import ReferenceDataLoader from './referenceDataLoader';
import MainLayout from './layout';
import Onboard from './onboard';
import './theme/default';

export default ({ modules }) => (
  <GlobalStateWrapper>
    <ConfigurationWrapper>
      <ReferenceDataLoader>
        <AuthenticationWrapper renderOnboarder={() => <Onboard />}>
          <MainLayout modules={modules} />
        </AuthenticationWrapper>
      </ReferenceDataLoader>
    </ConfigurationWrapper>
  </GlobalStateWrapper>
);
