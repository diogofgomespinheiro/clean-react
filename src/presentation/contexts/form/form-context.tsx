import * as React from 'react';

type FormStateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const FormContext = React.createContext<FormStateProps>(null);
FormContext.displayName = 'FormContext';

const FormProvider: React.FC<FormStateProps> = ({ children, ...state }) => (
  <FormContext.Provider value={state}>{children}</FormContext.Provider>
);

const useForm = (): FormStateProps => {
  const context = React.useContext(FormContext);

  if (context === undefined || typeof context === 'undefined') {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }

  return context;
};

export { FormProvider, useForm, FormStateProps };
