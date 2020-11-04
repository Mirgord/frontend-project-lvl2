import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';
import getFormatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').toString();
test.each(['.yml', '.json'])('diff_files', (format) => {
  expect(getFormatter(genDiff(`file1${format}`, `file2${format}`), 'stylish')).toEqual(readFile('expected_stylish'));
  expect(getFormatter(genDiff(`file1${format}`, `file2${format}`), 'json')).toEqual(readFile('expected_json'));
  expect(getFormatter(genDiff(`file1${format}`, `file2${format}`), 'plain')).toEqual(readFile('expected_plain'));
});
