import * as React from 'react';

import { useForm } from '@presentation/contexts';
import Styles from './styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = props => {
  const { formState, setFormState } = useForm();
  const { formData } = formState;

  const getStatus = (): string => '🔴';

  const getError = (): string => formData[props.name].error;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const {
      target: { name: inputName, value: inputValue }
    } = event;

    setFormState(oldState => ({
      ...oldState,
      formData: {
        ...oldState.formData,
        [inputName]: { ...oldState.formData[inputName], value: inputValue }
      }
    }));

    props.onChange(event);
  };

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={`${props.name}-input`}
        onChange={handleInputChange}
      />
      <span
        data-testid={`${props.name}-status`}
        title={getError()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
