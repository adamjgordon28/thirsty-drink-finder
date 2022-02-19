import { unitToOunceConverter } from "../constants/units";

export const getNumericalOunceAmountFromMeasure = (measure) => {
  let amount = 0;
  const measureArray = measure.split(" ");
  // checking if first value of measure string is numerical. If not, no need to continue
  if (measureArray[0] && isNaN(parseFloat(measureArray[0]))) {
    return null;
  }
  amount = eval(measureArray[0]);
  // checking if second value of measure string is numerical.
  // If so, is likely a fraction and should be evaluated,
  // if not, should determine if it is a convertable unit
  if (measureArray[1] && isNaN(parseFloat(measureArray[1]))) {
    // is not numerical so should be checked as convertible to ounces
    const conversionCoefficient = unitToOunceConverter[measureArray[1]];
    if (conversionCoefficient) {
      // is a convertable unit so should convert to ounces
      return amount * conversionCoefficient;
    }
    // is not a convertible unit so no need to capture as numerical data
    return null;
  } else {
    amount += eval(measureArray[1]);
    const conversionCoefficient = unitToOunceConverter[measureArray[2]];
    if (conversionCoefficient) {
      // is a convertable unit so should convert to ounces
      return amount * conversionCoefficient;
    }
    // is not a convertible unit so no need to capture as numerical data
    return null;
  }
};

export const getPieChartData = (ingredients) => {
  return ingredients.map(({ measure }) => {
    if (measure) {
      return getNumericalOunceAmountFromMeasure(measure);
    }
    return null;
  });
};

export const isPieChartDataEmpty = (data) => {
  let isEmpty = true;
  data?.forEach((entry) => {
    if (entry) {
      isEmpty = false;
    }
  });
  return isEmpty;
};
