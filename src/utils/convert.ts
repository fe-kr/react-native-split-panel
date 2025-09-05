import { isNil, isString } from './type-guards';

const percentageToNumber = (value: string) => parseFloat(value) / 100;

export const convertDimensionValue = (
  dimension: number | string | null,
  base: number
) => {
  if (isNil(dimension) || !isString(dimension)) {
    return dimension;
  }

  return percentageToNumber(dimension) * base;
};
