import * as React from 'react';

import Styles from './styles.scss';

type Props = React.HtmlHTMLAttributes<HTMLElement>;

const Spinner: React.FC<Props> = ({ className, ...props }) => (
  <div {...props} className={[Styles.spinner, className].join(' ')}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Spinner;
