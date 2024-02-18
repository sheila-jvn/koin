export const getPercentage = (percentage: number, value: number) =>
  (percentage * value) / 100;

export function roundToNearestMultiplierOf500(number: number) {
  const multiplier = 500;
  const roundedNumber = Math.round(number / multiplier) * multiplier;
  return roundedNumber;
}
