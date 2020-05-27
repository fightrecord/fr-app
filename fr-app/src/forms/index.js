import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Form from './Form';

export default () => (
  <Router>
    <div className="forms">
      <Switch>
        <Route path="/form/:formId">
          <Form />
        </Route>
        <Route path="/form">
          <Redirect to="/form/fighter" />
        </Route>
      </Switch>
    </div>
  </Router>
);
