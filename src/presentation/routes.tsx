import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import '@presentation/styles/global.scss';

type Props = {
  makeLogin: React.FC;
};

const Routes: React.FC<Props> = ({ makeLogin }) => (
  <Switch>
    <Route path="/login" component={makeLogin} />
  </Switch>
);

export default Routes;
