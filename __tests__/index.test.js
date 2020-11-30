import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import buildDiff from '../index.js';
import readFile from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const makeFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const expectedStylish = readFile(makeFixturePath('expected_stylish'));
const expectedJson = readFile(makeFixturePath('expected_json'));
const expectedPlain = readFile(makeFixturePath('expected_plain'));

test.each(['yml', 'json'])('builds diff for "%s" format', (format) => {
  const filepath1 = makeFixturePath(`file1.${format}`);
  const filepath2 = makeFixturePath(`file2.${format}`);
  expect(buildDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
  expect(buildDiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
  expect(buildDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  expect(buildDiff(filepath1, filepath2)).toEqual(expectedStylish);
});
