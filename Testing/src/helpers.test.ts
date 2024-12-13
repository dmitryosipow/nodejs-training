import { shortenPublicHoliday, validateInput } from './helpers';

describe('Helpers test', () => {
  test('should return true if input is correct', async () => {
    expect(validateInput({year: new Date().getFullYear(), country: 'DE'})).toEqual(true);
  });


  test('should throw error in case incorrect input country', async () => {
    expect(() => validateInput({year:2023, country: 'AA'})).toThrow(new Error('Country provided is not supported, received: AA'));
  });

  test('should throw error in case incorrect input year', async () => {
    expect(() => validateInput({year:2103, country: 'NL'})).toThrow(new Error('Year provided not the current, received: 2103'));
  });

  test('should return correct shorten holiday', async () => {
    expect(shortenPublicHoliday({
      date: "2023-01-01",
      localName: "Neujahr",
      name: "New Year's Day",
      countryCode: "DE",
      fixed: true,
      global: true,
      counties: null,
      launchYear: 1967,
      types: [
        "Public"
      ]
    })).toEqual({
      date: "2023-01-01",
      localName: "Neujahr",
      name: "New Year's Day",
    });
  });
});

