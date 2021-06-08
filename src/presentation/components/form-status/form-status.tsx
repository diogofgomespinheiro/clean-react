import * as React from 'react';

import Spinner from '@presentation/components/spinner';
import { useForm } from '@presentation/contexts';
import Styles from './styles.scss';

const FormStatus: React.FC = () => {
  const { errorState, formState } = useForm();

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {formState.isLoading && <Spinner className={Styles.spinner} />}
      {Boolean(errorState.main) && (
        <span className={Styles.error}>{errorState.main}</span>
      )}
    </div>
  );
};

export default FormStatus;
