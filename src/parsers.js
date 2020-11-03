import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  } if (format === '.yml') {
    return yaml.safeLoad(data);
  }
  throw new Error(`Unknown order state: '${format}'!`);
};

const readFile = (filename) => {
  const fullPath = path.resolve(process.cwd(), '__tests__/__fixtures__', filename);
  const format = path.extname(fullPath);
  const data = fs.readFileSync(fullPath).toString();
  return parse(data, format);
};
export default readFile;
