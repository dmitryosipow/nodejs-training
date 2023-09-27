import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { validateInput, shortenPublicHoliday } from '../helpers';
import { PublicHoliday, PublicHolidayShort } from '../types';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from './public-holidays.service';
import SpyInstance = jest.SpyInstance;

// Swagger https://date.nager.at/swagger/index.html

const mockedHolidays = [{
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
}, {
  date: "2023-01-06",
  localName: "Heilige Drei Könige",
  name: "Epiphany",
  countryCode: "DE",
  fixed: true,
  global: false,
  counties: [
    "DE-BW",
    "DE-BY",
    "DE-ST"
  ],
  launchYear: 1967,
  types: [
    "Public"
  ]
}];

const mockedShortenHolidays = [{
  date: "2023-01-01",
  localName: "Neujahr",
  name: "New Year's Day"
}, {
  date: "2023-01-06",
  localName: "Heilige Drei Könige",
  name: "Epiphany"
}];

describe('Public holidays test', () => {

  describe('List of public holidays', () => {
    let axiosGetSpy: SpyInstance;

    beforeAll(() => {
      axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: mockedHolidays }));
    })

    test('should return correct shorten list of holidays', async () => {
      const holidays = await getListOfPublicHolidays(2023, 'DE');
      expect(holidays).toEqual(mockedShortenHolidays);
    });


    test('should call API with proper arguments', async () => {
      const year = 2023;
      const country = 'NL';

      await getListOfPublicHolidays(year, country);

      // expect that axios.get() is called with proper args
      expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
    });

    test('should throw error in case incorrect input', async () => {
      await expect(getListOfPublicHolidays(2002, 'AA')).rejects.toThrow(new Error('Country provided is not supported, received: AA'));
    });

    afterAll(() => {
      jest.clearAllMocks();
    });
  });

  describe('Is today a public holiday', () => {
    let axiosGetSpy: SpyInstance;

    test('should return true if isTodayPublicHoliday return 200 status', async () => {
      axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
      const holiday = await checkIfTodayIsPublicHoliday('NL');
      expect(holiday).toEqual(true);
    });

    test('should return false if isTodayPublicHoliday returns incorrect response', async () => {
      axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
      const holiday = await checkIfTodayIsPublicHoliday('NL');
      expect(holiday).toEqual(false);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });
  });

  describe('Get next public holiday', () => {
    let axiosGetSpy: SpyInstance;

    test('should return proper next public holiday', async () => {
      axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: mockedHolidays }));
      const holidays = await getNextPublicHolidays('DE');
      expect(holidays).toEqual(mockedShortenHolidays);
    });

    test('should return empty if next public holiday returns incorrect response', async () => {
      axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());
      const holidays = await getNextPublicHolidays('NL');
      expect(holidays).toEqual([]);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });
  });

});
