import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import buildDiff from '../src/index.js';
import readFile from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const makeFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const expectedStylish = readFile(makeFixturePath('expected_stylish'));
const expectedJson = readFile(makeFixturePath('expected_json'));
const expectedPlain = readFile(makeFixturePath('expected_plain'));

test.each(['yml', 'json'])('diff_In_Files', (format) => {
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'stylish'))
    .toEqual(expectedStylish);
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'json'))
    .toEqual(expectedJson);
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'plain'))
    .toEqual(expectedPlain);
});
test.each(['yml', 'json'])('difference_In_Files_With_Default_Format', (format) => {
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`)))
    .toEqual(expectedStylish);
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`)))
    .toEqual(expectedStylish);
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`)))
    .toEqual(expectedStylish);
});
