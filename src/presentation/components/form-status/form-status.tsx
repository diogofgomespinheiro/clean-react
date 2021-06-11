import * as React from 'react';

import Spinner from '@presentation/components/spinner';
import { useForm } from '@presentation/contexts';
import Styles from './styles.scss';

const FormStatus: React.FC = () => {
  const { formState } = useForm();
  const { isLoading, error } = formState;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {Boolean(error) && <span className={Styles.error}>{error}</span>}
    </div>
  );
};

export default FormStatus;
