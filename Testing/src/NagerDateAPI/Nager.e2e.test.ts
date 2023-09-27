// Swagger https://date.nager.at/swagger/index.html
import axios from 'axios';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

describe('Nager API', () => {
  describe('/IsTodayPublicHoliday', () => {
    test('should return 200 or 204 for correct country code', async () => {
      const { status } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/NL`);

      expect([200, 204]).toContain(status);
    });

    test('should return 404 when country code is incorrect', async () => {
      await expect(axios.get(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/NLL`)).rejects.toThrowError('Request failed with status code 404');
    });
  });

  describe('/PublicHolidays', () => {
    test('should return status 200 and correct holidays', async () => {
      const year = new Date().getFullYear();
      const country = 'BY';
      const { status, data } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);

      expect(status).toEqual(200);
      expect(data.length).toEqual(10);
    });
  });
});
