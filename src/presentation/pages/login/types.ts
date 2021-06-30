import { Authentication } from '@domain/usecases';
import { Validator } from '@presentation/protocols';

export type LoginProps = {
  authenticator: Authentication;
  validator: Validator;
};
