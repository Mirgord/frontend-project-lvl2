import { dirname, path } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').toString();
test('diffjsonfiles', () => {
  expect(genDiff('filepath1.json', 'filepath2.json')).toEqual(readFile('expected_file_json'));
});
