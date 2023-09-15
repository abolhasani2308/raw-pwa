//@ts-nocheck
import {useEffect, useMemo, useRef, useState} from 'react';
import {
  merge,
  ValidationFunction,
  ValidationResult,
} from '../../utils/Validators';

export function useValidatedState<T>(
  initialState: T,
  validators: ValidationFunction<T>[],
  disable?: boolean,
) {
  const isValid = useRef(merge(validators)).current;
  const [value, setValue] = useState(initialState);
  const [result, setResult] = useState<ValidationResult>({});
  useEffect(() => {
    !disable ? setResult(isValid(value)) : setResult({});
  }, [value, disable, isValid]);
  return useMemo(
    () => ({
      value,
      setValue,
      result,
      validate: () => isValid(value),
      checkError: () => !!isValid(value).error,
    }),
    [value, setValue, result, isValid],
  );
}
