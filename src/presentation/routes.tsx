import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { LoginPage } from '@presentation/pages';
import '@presentation/styles/global.scss';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
  </Switch>
);

export default Routes;
