import 'colors';
import { inquirerMenu, pause, readInput, listCities } from './helpers/inquirer';
import { Place, SearchHistory } from './models/SearchHistory';
import { config } from 'dotenv';

config();

const main = async () => {
  let option: number | null = null;

  const searchHistory = new SearchHistory();

  searchHistory.initialize();

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        const targetCity = await readInput('Enter a city name:');

        const cities = await searchHistory.searchCity(targetCity);

        if (!cities.length) {
          console.log(`No results found for`, `${targetCity}`.red.bold);
          break;
        }

        const selectedCityId = await listCities(cities);

        if (selectedCityId === '0') {
          break;
        }

        const selectedCity = cities.find((city: any) => city.id === selectedCityId);

        if (!selectedCity) {
          console.log(`\n${'No weather data found for the city'.red.bold}`);
          break;
        }

        searchHistory.addToSearchHistory(selectedCity);
        searchHistory.saveSearchHistory();

        const weatherInfo = await searchHistory.getWeather(selectedCity);

        if (weatherInfo) {
          console.log(`\nInformation about the city\n`.white.bold);
          console.log('City:', selectedCity?.name.green);
          console.log('');
          console.log('Latitude:', `${selectedCity?.latitude}°`.yellow);
          console.log('Longitude:', `${selectedCity?.longitude}°`.yellow);
          console.log('');
          console.log(
            'Weather description:',
            `${weatherInfo.weather.main} - ${weatherInfo?.weather?.description}`.green
          );
          console.log('Temperature:', `${weatherInfo?.main?.temp}°C`.yellow);
          console.log('Feels Like:', `${weatherInfo?.main?.feels_like}°C`.yellow);
          console.log('Minimum Temperature:', `${weatherInfo?.main?.temp_min}°C`.yellow);
          console.log('Maximum Temperature:', `${weatherInfo?.main?.temp_max}°C`.yellow);
          console.log('Pressure:', `${weatherInfo?.main?.pressure}hPa`.yellow);
          console.log('Humidity:', `${weatherInfo?.main?.humidity}%`.yellow);
        }

        await pause();

        break;

      case 2:
        searchHistory.getSearchHistory().length
          ? searchHistory.getSearchHistory().forEach((city: Place, index) => {
              console.log(`${index + 1}. ${city.name}`);
            })
          : console.log('Search history is empty'.blue.bold);

        await pause();

        break;

      case 0:
        break;

      default:
        console.log('Invalid option'.red.bgWhite.bold);
    }
  } while (option !== 0);

  await pause();
};

main();
