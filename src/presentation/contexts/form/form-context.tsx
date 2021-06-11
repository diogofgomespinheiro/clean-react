import * as React from 'react';

type FormDataProps = {
  error: string;
  value: string;
};

type FormState = {
  isLoading: boolean;
  formData: Record<string, FormDataProps>;
  error: string;
};

type FormContextProps = {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
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

export { FormProvider, useForm, FormContextProps, FormState, FormDataProps };
