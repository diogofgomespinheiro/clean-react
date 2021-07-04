import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@presentation/routes';
import { makeLogin } from '@main/factories';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes makeLogin={makeLogin} />
  </BrowserRouter>
);

export default App;
