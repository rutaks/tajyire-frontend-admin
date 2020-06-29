import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ForgotPasswordFinalStep from '../pages/ForgotPasswordFinalStep';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/forgot-password-success" component={ForgotPasswordFinalStep} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
    </Switch>
  );
}
