import fs from 'fs';
import path from 'path';

const readFile = (filename) => {
  const fullPath = path.resolve(process.cwd(), '__tests__/__fixtures__', filename);
  const data = fs.readFileSync(fullPath).toString();
  return (data);
};

export default readFile;
