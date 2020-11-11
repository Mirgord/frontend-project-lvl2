import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const fullFilePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullFilePath, 'utf-8');
  return data;
};

export default readFile;
