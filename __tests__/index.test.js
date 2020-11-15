import buildDiff from '../src/index.js';
import { readFile, path } from '../src/utils.js';

const makeFixturePath = (filename) => path.join('__tests__/__fixtures__/', `${filename}`);

test.each(['yml', 'json'])('diff_files', (format) => {
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'stylish'))
    .toEqual(readFile(makeFixturePath('expected_stylish')));
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'json'))
    .toEqual(readFile(makeFixturePath('expected_json')));
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'plain'))
    .toEqual(readFile(makeFixturePath('expected_plain')));
});
