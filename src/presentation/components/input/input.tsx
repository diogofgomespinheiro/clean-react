import * as React from 'react';

import { useForm } from '@presentation/contexts';
import Styles from './styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = props => {
  const { errorState } = useForm();

  const getStatus = (): string => '🔴';

  const getTitle = (): string => errorState[props.name];

  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
