import buildDiff from '../src/index.js';
import readFile from '../src/utils.js';

test.each(['yml', 'json'])('diff_files', (format) => {
  expect(buildDiff(`file1.${format}`, `file2.${format}`, 'stylish')).toEqual(readFile('expected_stylish'));
  expect(buildDiff(`file1.${format}`, `file2.${format}`, 'json')).toEqual(readFile('expected_json'));
  expect(buildDiff(`file1.${format}`, `file2.${format}`, 'plain')).toEqual(readFile('expected_plain'));
});
