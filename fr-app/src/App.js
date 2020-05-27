import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Framework from './framework';
import Forms from './forms';

import onboard from './modules/onboard';
import chatModule from './modules/chat';
import profileModule from './modules/profile';
import homeModule from './modules/home';
import './themes/default';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/form">
          <Forms />
        </Route>
        <Route path="/">
          <Framework
            modules={[
              chatModule,
              homeModule,
              profileModule
            ]}
            renderOnboarder={onboard}
          />
        </Route>
      </Switch>
    </Router>
  );
}