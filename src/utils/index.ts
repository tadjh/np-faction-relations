export function shouldResetMutation(
  success: boolean,
  error: boolean,
  loading = false
) {
  return success || error || loading;
}

export function getErrorMessage(error: any) {
  return error.response.data.message;
}

export function isEmptyString(str: string) {
  return str === '';
}

export function isNotEmptyString(str: string) {
  return !isEmptyString(str);
}

export function isStrictEqual(value1: any, value2: any) {
  return value1 === value2;
}

export function isNotEqual(value1: any, value2: any) {
  return value1 !== value2;
}

export function isBothTrue(bool1: boolean, bool2: boolean) {
  return bool1 && bool2;
}

export function isBothOdd(num1: number, num2: number) {
  return num1 % 2 > 0 && num2 % 2 > 0;
}

export function isBothEven(num1: number, num2: number) {
  return num1 % 2 === 0 && num2 % 2 === 0;
}

export function isBothOddOrBothEven(num1: number, num2: number) {
  return isBothOdd(num1, num2) || isBothEven(num1, num2);
}

export function isAllFalse(bool1: boolean, bool2: boolean, bool3: boolean) {
  return !bool1 && !bool2 && !bool3;
}

export function isGreaterThan(num1: number, num2: number) {
  return num1 > num2;
}
