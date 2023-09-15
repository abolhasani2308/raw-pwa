//@ts-nocheck
import numbro from 'numbro';

export function numberFormatter<T extends string | number>(
  number?: T,
  format?: Pick<
    numbro.Format,
    'mantissa' | 'forceSign' | 'output' | 'thousandSeparated'
  >,
  fallback?: string,
) {
  if (Number.isNaN(Number(number)) || number === '') return fallback;
  const num = number === null ? numbro(0) : numbro(number);
  const val = Math.abs(num.value());
  const belowOne = val < 1;
  const belowTen = val < 10;
  const res = num.format({
    thousandSeparated: true,
    mantissa: belowOne ? 9 : belowTen ? 4 : 2,
    ...format,
  });

  return res !== 'NaN' ? res : fallback;
}

export function staticNumberFormatter(value: string | number) {
  if (value) {
    const parts = String(value)?.split('.');

    let integer = numbro(parts?.[0])?.format({thousandSeparated: true});
    let res;
    if (parts?.length > 1) {
      res = integer + '.' + parts?.[1];
    } else {
      res = integer;
    }
    return res ?? '0';
  } else {
    return '0';
  }
}

export function inputNumberFormatter(value: string) {
  if (value) {
    const parts = String(value)?.split('.');

    let integer = numbro(parts?.[0])?.format({thousandSeparated: true});
    let res;
    if (parts?.length > 1) {
      res = integer + '.' + parts?.[1];
    } else {
      res = integer;
    }
    return res ?? '';
  } else {
    return '';
  }
}

export function inputNumberFormateSetter(
  value: string,
  valueSetter: (value: string) => void,
) {
  let pureTxt = value.replaceAll(',', '');
  const regEx = new RegExp(/^[0-9]*\.?[0-9]*$/);
  var check = regEx.test(String(pureTxt));
  console.log(check, pureTxt);
  if (check || value?.length <= 1) {
    valueSetter(pureTxt);
  }
}
