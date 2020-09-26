import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const readFile = (filename) => {
  const fullPath = path.resolve(process.cwd(), '__tests__/__fixtures__', filename);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const genDiff = (path1, path2) => {
  const data1 = JSON.parse(readFile(path1));
  const data2 = JSON.parse(readFile(path2));
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const diff = keys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      return `${acc} \n  ${key}: ${data1[key]}`;
    } if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return `${acc} \n- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
    } if (_.has(data1, key) && (!_.has(data2, key))) {
      return `${acc} \n- ${key}: ${data1[key]}`;
    } if (!_.has(data1, key) && _.has(data2, key)) {
      return `${acc} \n+ ${key}: ${data2[key]}`;
    }
    return acc;
  }, '');
  console.log(`{${diff}\n}`);
  return `{${diff}\n}`;
};

export default genDiff;
