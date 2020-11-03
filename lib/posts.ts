import fs from 'fs';
import path from 'path';
import neatCsv from 'neat-csv';
import { IBook, IMagazine } from '../schemas';

const libraryDirectory = path.join(process.cwd(), 'library');

export async function getData(file) {
  const isArrayOfFiles = Array.isArray(file);
  const data = await Promise.all(
    (isArrayOfFiles ? file : [file]).map(async (fileName) => {
      const fullPath = path.join(libraryDirectory, fileName);
      const entity = fileName.replace(/\.csv$/, '');
      try {
        const file = fs.readFileSync(fullPath);
        const dataFile = await neatCsv(file, { separator: ';' });

        return dataFile.map((data) => ({ ...data, entity }));
      } catch (e) {
        console.error(e);
        return [];
      }
    }),
  );

  if (isArrayOfFiles) {
    const result = [];
    data.forEach((item: Array<IBook | IMagazine>) => result.push(...item));
    return result;
  }

  return data[0];
}

export async function getDataItem(entity, id) {
  const fullPath = path.join(libraryDirectory, `${entity}.csv`);
  try {
    const file = fs.readFileSync(fullPath);
    const dataFile = await neatCsv(file, { separator: ';' });

    return dataFile.find((file) => file.isbn === id);
  } catch (e) {
    console.error(e);
    return {};
  }
}
