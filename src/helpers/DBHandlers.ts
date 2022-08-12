import fs from 'fs';

const filePath = './src/db/db.json';

export const saveToDB = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify({ tasks: data }));
};

export const readFromDB = () => {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const persistedData = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });

  return JSON.parse(persistedData);
};
