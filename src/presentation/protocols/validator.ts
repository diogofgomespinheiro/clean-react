export interface Validator {
  validate(input: Record<string, unknown>): string;
}
