import axios from 'axios';

export class SearchHistory {
  private history: any[] = [];

  constructor() {
    // TODO: read from DB and populate history
  }

  async searchCity(
    city: string,
    { limit = 10, proximity = 'ip', language = 'en', fuzzyMatch = true } = {}
  ) {
    try {
      const BASE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
      const ACCESS_TOKEN = process.env.MAPBOX_TOKEN;

      const axiosInstance = axios.create({
        baseURL: `${BASE_URL}/${city}.json`,
        params: {
          access_token: ACCESS_TOKEN,
          limit,
          proximity,
          types: 'place,postcode,address',
          language,
          fuzzyMatch,
        },
      });

      const { data } = await axiosInstance.get('/');

      return data;
    } catch (error) {
      return [];
    }
  }
}
