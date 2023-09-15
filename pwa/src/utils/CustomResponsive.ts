//@ts-nocheck
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export function customResponsiveHeight(dim: number) {
  const total = responsiveHeight(100);
  const base = 600;
  if (total < base) {
    return responsiveHeight(dim);
  } else {
    return (
      ((responsiveHeight(100) - base) * 0.6 * dim) / 100 + (dim / 100) * base
    );
  }
}

export function customResponsiveWidth(dim: number) {
  return responsiveWidth(dim);
}

export function customResponsiveFont(dim: number) {
  const total = responsiveFontSize(100);
  const base = 735;
  if (total < base) {
    return responsiveFontSize(dim);
  } else {
    return (
      ((responsiveFontSize(100) - base) * 0.33 * dim) / 100 + (dim / 100) * base
    );
  }
}
