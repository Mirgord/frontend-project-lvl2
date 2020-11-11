import buildDiff from '../src/index.js';
import readFile from '../src/utils.js';

test.each(['yml', 'json'])('diff_files', (format) => {
  expect(buildDiff(`__tests__/__fixtures__/file1.${format}`, `__tests__/__fixtures__/file2.${format}`, 'stylish')).toEqual(readFile('__tests__/__fixtures__/expected_stylish'));
  expect(buildDiff(`__tests__/__fixtures__/file1.${format}`, `__tests__/__fixtures__/file2.${format}`, 'json')).toEqual(readFile('__tests__/__fixtures__/expected_json'));
  expect(buildDiff(`__tests__/__fixtures__/file1.${format}`, `__tests__/__fixtures__/file2.${format}`, 'plain')).toEqual(readFile('__tests__/__fixtures__/expected_plain'));
});
