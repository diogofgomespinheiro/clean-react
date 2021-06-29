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

  const getStatus = (): string => (formData[props.name].error ? '🔴' : '🟢');

  const getTitle = (): string =>
    formData[props.name].error || "Everything's good!";

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
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
