import path from 'path';
import ini from 'ini';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  } if (format === '.yml') {
    return yaml.safeLoad(data);
  } if (format === '.ini') {
    return ini.parse;
  } throw new Error(`Unknown order state: '${format}'!`);
};

const readFile = (filename) => {
  const fullPath = path.resolve(process.cwd(), '__tests__/__fixtures__', filename);
  const format = path.extname(fullPath);
  const data = fs.readFileSync(fullPath).toString();
  return parse(data, format);
};

const genDiff = (path1, path2) => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const diff = keys.reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      return `${acc} \n  ${key}: ${data1[key]}`;
    } if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return `${acc} \n- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
    } if (_.has(data1, key) && (!_.has(data2, key))) {
      return `${acc} \n- ${key}: ${data1[key]}`;
    }
    return `${acc} \n+ ${key}: ${data2[key]}`;
  }, '');
  return `{${diff}\n}`;
};

export default genDiff;
