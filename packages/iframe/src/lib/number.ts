// 숫자 포매팅 관련 함수
// 최대 자릿수는 15자리 (소숫점 아래 자리까지 포함)
// 만약 소숫점 포함 15자리가 넘어간다면 아래 함수들은 소숫점 15자리까지만 표시하고 나머지는 날림
const MAX_DIGIT = 15;

export const formatAmount = (value: string | number) => {
  if (typeof value === 'number') value = value.toString();

  const removeComma = value.replace(/,/g, '');
  const [integer, decimal] = removeComma.split('.');

  const formatInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formatDecimal = decimal ? decimal.slice(0, MAX_DIGIT - integer.length) : '';

  return formatDecimal ? `${formatInteger}.${formatDecimal}` : formatInteger;
};
