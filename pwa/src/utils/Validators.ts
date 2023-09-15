//@ts-nocheck
export interface ValidationResult {
  error?: string;
  warning?: string;
}

export interface ValidationFunction<T> {
  (value?: T): ValidationResult | undefined;
}

/**
 * Create a merged validator from an array of validators that returns the first occurred validation error.
 * @param arr Array of validator functions
 */
export const merge = <T>(arr: ValidationFunction<T>[]) => {
  return (value: T) => {
    let occurred: ValidationResult = {};
    arr.find(validate => {
      const result = validate(value);
      if (!result) {
        return false;
      } else {
        return !!(occurred = result);
      }
    });
    return occurred;
  };
};

/**
 * Create a validator from an array of validators that returns an array of validation errors.
 * @param arr Array of validator functions
 */
export const create =
  <T>(arr: Array<ValidationFunction<T>>) =>
  (str: T) =>
    arr.map(validate => validate(str));
