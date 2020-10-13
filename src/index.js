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
    return ini.parse(data);
  } throw new Error(`Unknown order state: '${format}'!`);
};

const readFile = (filename) => {
  const fullPath = path.resolve(process.cwd(), '__tests__/__fixtures__', filename);
  const format = path.extname(fullPath);
  const data = fs.readFileSync(fullPath).toString();
  return parse(data, format);
};
const formator = (data) => {
  const a = data.reduce((acc, child) => {
    const {
      type, key, value1, value2,
    } = child;
    if (type === 'unchanged') {
      return `${acc} \n  ${key}: ${value1}`;
    } if (type === 'changed') {
      return `${acc} \n- ${key}: ${value1}\n+ ${key}: ${value2}`;
    } if (type === 'removed') {
      return `${acc} \n- ${key}: ${value1}`;
    }
    return `${acc} \n+ ${key}: ${value1}`;
  }, '');
  console.log(`{${a}\n}`);
  return `{${a}\n}`;
};

const genDiff = (file1, file2) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const keys = _.union(_.keys(_.clone(data1)), _.keys(_.clone(data2))).sort();
  const diff = keys.map((key) => {
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      return { type: 'unchanged', key: `${[key]}`, value1: data1[key] };
    } if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return {
        type: 'changed', key: `${[key]}`, value1: data1[key], value2: data2[key],
      };
    } if (_.has(data1, key) && (!_.has(data2, key))) {
      return { type: 'removed', key: `${[key]}`, value1: data1[key] };
    }
    return { type: 'added', key: `${[key]}`, value1: data2[key] };
  });
  return formator(diff);
};

export default genDiff;
