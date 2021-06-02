import * as React from 'react';

import Logo from '@presentation/components/logo';
import Styles from './styles.scss';

const LoginHeader: React.FC = () => (
  <header className={Styles.header}>
    <Logo fill="white" height={80} width={80} />
    <h1>4Dev - Surveys for Developers</h1>
  </header>
);

export default LoginHeader;
