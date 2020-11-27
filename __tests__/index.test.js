import buildDiff from '../src/index.js';
import readFile from '../src/utils.js';

const makeFixturePath = (filename) => `__tests__/__fixtures__/${filename}`;

test.each(['yml', 'json'])('diff_In_Files', (format) => {
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'stylish'))
    .toEqual(readFile(makeFixturePath('expected_stylish')));
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'json'))
    .toEqual(readFile(makeFixturePath('expected_json')));
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`), 'plain'))
    .toEqual(readFile(makeFixturePath('expected_plain')));
});
test.each(['yml', 'json'])('difference_In_Files_With_Default_Format', (format) => {
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`)))
    .toEqual(readFile(makeFixturePath('expected_stylish')));
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`)))
    .toEqual(readFile(makeFixturePath('expected_stylish')));
  expect(buildDiff(makeFixturePath(`file1.${format}`), makeFixturePath(`file2.${format}`)))
    .toEqual(readFile(makeFixturePath('expected_stylish')));
});
