import inquirer from 'inquirer';
import 'colors';
import { Place } from '../models/SearchHistory';

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1'.green}. Search City`,
      },
      {
        value: 2,
        name: `${'2'.green}. View Search History`,
      },
      {
        value: 0,
        name: `${'0'.green}. Exit`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log('==============================='.green);
  console.log('Welcome to the Weather App CLI'.white);
  console.log('==============================='.green);
  console.log('');

  const { option } = await inquirer.prompt(menuOptions);

  return option;
};

export const pause = async () => {
  console.log(`\n`);
  await inquirer.prompt({
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.green} to continue...`,
  });
};

export const readInput = async (message: string) => {
  const { answer } = await inquirer.prompt({
    type: 'input',
    name: 'answer',
    message,
    validate: (input: string) => (input.trim().length > 0 ? true : 'Please enter a value'),
  });

  return answer;
};

export const confirmSelection = async (message: string): Promise<boolean> => {
  const { answer } = await inquirer.prompt({
    type: 'confirm',
    name: 'answer',
    message,
  });

  return answer;
};

export const listCities = async (places: Place[]): Promise<string> => {
  const choices = places.map((place, index) => ({
    value: place.id,
    name: `${(index + 1).toString().green}. ${place.name}`,
  }));

  choices.unshift({
    value: '0',
    name: `${'0'.green}. Cancel`,
  });

  const { selectedCityId } = await inquirer.prompt({
    type: 'list',
    name: 'selectedCityId',
    message: 'Select a city:',
    choices,
  });

  return selectedCityId;
};
