import 'colors';
import { inquirerMenu, pause, readInput, listCities } from './helpers/inquirer';
import { SearchHistory } from './models/SearchHistory';
import { config } from 'dotenv';

config();

const main = async () => {
  let option: number | null = null;

  const searchHistory = new SearchHistory();

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        const targetCity = await readInput('Enter a city name:');

        const cities = await searchHistory.searchCity(targetCity);

        if (cities.length > 0) {
          const { selectedCityId } = await listCities(cities);

          const selectedCity = cities.find((city: any) => city.id === selectedCityId);

          let weatherInfo = null;
          if (selectedCity) {
            weatherInfo = await searchHistory.getWeather(selectedCity);
          }

          if (weatherInfo) {
            console.log(`\nInformation about the city\n`.white.bold);
            console.log('City:'.green, selectedCity?.name);
            console.log('');
            console.log('Latitude:'.green, `${selectedCity?.latitude}°`);
            console.log('Longitude:'.green, `${selectedCity?.longitude}°`);
            console.log('');
            console.log(
              'Weather description:'.green,
              `${weatherInfo.weather.main} - ${weatherInfo?.weather?.description}`
            );
            console.log('Temperature:'.green, `${weatherInfo?.main?.temp}°C`);
            console.log('Feels Like:'.green, `${weatherInfo?.main?.feels_like}°C`);
            console.log('Minimum Temperature:'.green, `${weatherInfo?.main?.temp_min}°C`);
            console.log('Maximum Temperature:'.green, `${weatherInfo?.main?.temp_max}°C`);
            console.log('Pressure:'.green, `${weatherInfo?.main?.pressure}hPa`);
            console.log('Humidity:'.green, `${weatherInfo?.main?.humidity}%`);
          } else {
            console.log(`\n${'No weather data found for the city'.red.bold}`);
          }
        } else {
          console.log('No results found'.red.bgWhite.bold);
        }

        await pause();

        break;

      case 2:
        console.log('View Search History');
        break;

      case 0:
        console.log('Exit');
        break;

      default:
        console.log('Invalid option');
    }
  } while (option !== 0);

  await pause();
};

main();
