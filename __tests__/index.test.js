import { genDiff, fs } from '../src/index.js';

test('diffjsonfiles', () => {
  const data = fs.readFileSync('/home/vladimir/frontend-project-lvl2/__tests__/__fixtures__/testjson').toString();
  expect(genDiff('filepath1.json', 'filepath2.json')).toEqual(data);
});
