import buildDiff from '../src/index.js';
import readFile from '../src/utils.js';

const path = '__tests__/__fixtures__/';

test.each(['yml', 'json'])('diff_files', (format) => {
  expect(buildDiff(`${path}file1.${format}`, `${path}file2.${format}`, 'stylish'))
    .toEqual(readFile(`${path}expected_stylish`));
  expect(buildDiff(`${path}file1.${format}`, `${path}file2.${format}`, 'json'))
    .toEqual(readFile(`${path}expected_json`));
  expect(buildDiff(`${path}file1.${format}`, `${path}file2.${format}`, 'plain'))
    .toEqual(readFile(`${path}expected_plain`));
});
