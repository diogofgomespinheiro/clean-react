import * as React from 'react';

type ErrorState = {
  [key: string]: string;
  main: string;
};

type FormState = {
  isLoading: boolean;
};

type FormContextProps = {
  errorState: ErrorState;
  formState: FormState;
};

const FormContext = React.createContext<FormContextProps>(null);
FormContext.displayName = 'FormContext';

const FormProvider: React.FC<FormContextProps> = ({ children, ...state }) => (
  <FormContext.Provider value={state}>{children}</FormContext.Provider>
);

const useForm = (): FormContextProps => {
  const context = React.useContext(FormContext);

  if (context === undefined || typeof context === 'undefined') {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }

  return context;
};

export { FormProvider, useForm, FormContextProps, ErrorState, FormState };
