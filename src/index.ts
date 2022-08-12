import 'colors';
import { inquirerMenu, pause } from './helpers/inquirer';

const main = async () => {
  let option: number | null = null;

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        console.log('Search City');
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
