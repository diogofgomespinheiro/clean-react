import * as React from 'react';

import { LoginPage } from '@presentation/pages';
import { RemoteAuthentication } from '@data/usecases';
import { AxiosHttpClient } from '@infra/http';
import { ValidatorComposite } from '@validation/validators';
import { ValidatorBuilder } from '@validation/validators/builder';

export const makeLogin: React.FC = () => {
  const url = 'http://localhost:5050/api/v1/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
  const validatorComposite = new ValidatorComposite([
    ...ValidatorBuilder.field('email').required().email().build(),
    ...ValidatorBuilder.field('password').required().min(5).build()
  ]);

  return (
    <LoginPage
      authenticator={remoteAuthentication}
      validator={validatorComposite}
    />
  );
};
