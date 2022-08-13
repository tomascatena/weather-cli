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

          // Show weather data
          console.log(`\nInformation about the city\n`.white.bold);
          console.log('City:'.green, selectedCity?.name);
          console.log('Latitude:'.green, `${selectedCity?.latitude}°`);
          console.log('Longitude:'.green, `${selectedCity?.longitude}°`);
          console.log('Temperature:'.green, '32°C');
          console.log('Minimum Temperature:'.green, '-10°C');
          console.log('Maximum Temperature:'.green, '50°C');
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
