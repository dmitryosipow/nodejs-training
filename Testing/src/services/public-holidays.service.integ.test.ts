import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { validateInput, shortenPublicHoliday } from '../helpers';
import { PublicHoliday, PublicHolidayShort } from '../types';
import { getListOfPublicHolidays } from './public-holidays.service';
import SpyInstance = jest.SpyInstance;

// Swagger https://date.nager.at/swagger/index.html



describe('Public holidays integration test', () => {
  test('should call API with proper arguments', async () => {
    const year = 2023;
    const country = 'NL';

    const holidays = await getListOfPublicHolidays(year, country);

    // expect that axios.get() is called with proper args
    expect(holidays.length).toEqual(11);
  });

});
