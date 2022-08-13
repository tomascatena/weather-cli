import axios from 'axios';

export interface Place {
  id: string;
  name: string;
  center: number[];
  latitude: number;
  longitude: number;
}

interface WeatherInfo {
  weather: {
    description: string;
    icon: string;
    main: string;
    id: number;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    feels_like: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

export class SearchHistory {
  private history: any[] = [];

  constructor() {
    // TODO: read from DB and populate history
  }

  async searchCity(
    city: string,
    { limit = 10, proximity = 'ip', language = 'en', fuzzyMatch = true } = {}
  ): Promise<Place[]> {
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

      const {
        data: { features },
      } = await axiosInstance.get('/');

      return features.map((place: any) => ({
        id: place.id,
        name: place.place_name,
        latitude: place.center[1],
        longitude: place.center[0],
        center: place.center,
      }));
    } catch (error) {
      return [];
    }
  }

  async getWeather(
    city: Place,
    { units = 'metric', lang = 'en' } = {}
  ): Promise<WeatherInfo | null> {
    try {
      const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
      const ACCESS_TOKEN = process.env.OPENWEATHER_API_KEY;

      const axiosInstance = axios.create({
        baseURL: `${BASE_URL}`,
        params: {
          appid: ACCESS_TOKEN,
          units,
          lang,
          lat: city.latitude,
          lon: city.longitude,
        },
      });

      const { data } = await axiosInstance.get('/');

      return {
        weather: data.weather[0],
        main: data.main,
        wind: data.wind,
      };
    } catch (error) {
      return null;
    }
  }
}
