import { shortenAddress } from '../../lib/address';

describe('shortenAddress', () => {
  [
    {
      scenario: '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520',
      input: '0x5D5AA22d586b7904B2D348fad79b1eA3D0eeb520',
      want: '0x5D5A...b520',
    },
    {
      scenario: '0x27f0E3a80614fF941AAf94fCE5118cd143A156D5',
      input: '0x27f0E3a80614fF941AAf94fCE5118cd143A156D5',
      want: '0x27f0...56D5',
    },
  ].forEach((s) =>
    test(`${s.scenario}`, () => {
      expect(shortenAddress(s.input)).toBe(s.want);
    })
  );
});
