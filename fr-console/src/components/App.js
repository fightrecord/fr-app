import React from 'react';
import GlobalStateWrapper from '../wrappers/GlobalStateWrapper';
import ConfigurationWrapper from '../wrappers/ConfigurationWrapper';
import AuthenticationWrapper from '../wrappers/AuthenticationWrapper';
import Console from './Console';
import SignIn from './SignIn';

export default () => (
  <GlobalStateWrapper>
    <ConfigurationWrapper>
      <AuthenticationWrapper renderSignIn={() => <SignIn />}>
        <Console />
      </AuthenticationWrapper>
    </ConfigurationWrapper>
  </GlobalStateWrapper>
)