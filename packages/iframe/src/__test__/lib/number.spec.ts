import { formatAmount } from '../../lib/number';

describe('formatAmount', () => {
  [
    { scenario: '10,000,000', input: '10000000', want: '10,000,000' },
    { scenario: '999,999,999.123456', input: '999999999.123456', want: '999,999,999.123456' },
    {
      scenario: '999,999,999.12345678911',
      input: '999999999.12345678911',
      want: '999,999,999.123456',
    },
    { scenario: '0.123456', input: '0.123456', want: '0.123456' },
  ].forEach((s) =>
    test(`${s.scenario}`, () => {
      expect(formatAmount(s.input)).toBe(s.want);
    })
  );
});
