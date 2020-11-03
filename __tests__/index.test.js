import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';
import getFormatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').toString();
test('diff_files_json', () => {
  expect(getFormatter(genDiff('file1.json', 'file2.json'), 'stylish')).toEqual(readFile('expected_stylish'));
  expect(getFormatter(genDiff('file1.json', 'file2.json'), 'json')).toEqual(readFile('expected_json'));
  expect(getFormatter(genDiff('file1.json', 'file2.json'), 'plain')).toEqual(readFile('expected_plain'));
});
test('diff_files_yml', () => {
  expect(getFormatter(genDiff('file1.yml', 'file2.yml'), 'stylish')).toEqual(readFile('expected_stylish'));
  expect(getFormatter(genDiff('file1.yml', 'file2.yml'), 'json')).toEqual(readFile('expected_json'));
  expect(getFormatter(genDiff('file1.yml', 'file2.yml'), 'plain')).toEqual(readFile('expected_plain'));
});
