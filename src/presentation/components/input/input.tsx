import * as React from 'react';

import Styles from './styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = props => (
  <div className={Styles.inputWrap}>
    <input {...props} />
    <span className={Styles.status}>🔴</span>
  </div>
);

export default Input;
