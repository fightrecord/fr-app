import React from 'react';
import GlobalStateWrapper from './wrappers/GlobalStateWrapper';
import ConfigurationWrapper from './wrappers/ConfigurationWrapper';
import AuthenticationWrapper from './wrappers/AuthenticationWrapper';
import ReferenceDataLoader from './referenceDataLoader';
import MainLayout from './layout';
import './theme/default';

export default ({ modules, renderOnboarder = () => null }) => (
  <GlobalStateWrapper>
    <ConfigurationWrapper>
      <ReferenceDataLoader>
        <AuthenticationWrapper renderOnboarder={renderOnboarder}>
          <MainLayout modules={modules} />
        </AuthenticationWrapper>
      </ReferenceDataLoader>
    </ConfigurationWrapper>
  </GlobalStateWrapper>
);
