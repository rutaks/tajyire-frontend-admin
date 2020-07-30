import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ForgotPasswordFinalStep from '../pages/ForgotPasswordFinalStep';
import PrivateRoute from './PrivateRoute';
import Logout from '../pages/Logout';
import AdminAccountFinalStep from '../pages/AdminAccountFinalStep';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/forgot-password-success" component={ForgotPasswordFinalStep} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/activate-account/:token" component={AdminAccountFinalStep} />
      <Route path="/" component={PrivateRoute} />
    </Switch>
  );
}
