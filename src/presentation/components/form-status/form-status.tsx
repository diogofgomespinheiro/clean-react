import * as React from 'react';

import Spinner from '@presentation/components/spinner';
import { useForm } from '@presentation/contexts';
import Styles from './styles.scss';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useForm();

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {Boolean(errorMessage) && (
        <span className={Styles.error}>{errorMessage}</span>
      )}
    </div>
  );
};

export default FormStatus;
