import 'colors';
import { inquirerMenu, pause, readInput } from './helpers/inquirer';
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
        // Show message
        const targetCity = await readInput('Enter a city name:');

        // Search places
        const places = await searchHistory.searchCity(targetCity);

        console.log(places);

        // Select a place

        // Fetch weather data

        // Show weather data
        console.log(`\nInformation about ${targetCity}}\n`.green);
        console.log('City:'.green, 'New York');
        console.log('Latitude:'.green, '40.7128');
        console.log('Longitude:'.green, '74.0059');
        console.log('Temperature:'.green, '32°C');
        console.log('Minimum Temperature:'.green, '-10°C');
        console.log('Maximum Temperature:'.green, '50°C');

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
