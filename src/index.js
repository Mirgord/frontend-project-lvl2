import path from 'path';
import ini from 'ini';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const step = 4;

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

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = _.keys(_.clone(data));
  const tab = (' ').repeat(depth);
  const result = keys.map((key) => {
    if (_.isPlainObject(data[key])) {
      return `    ${tab}${key}: ${stringify(data[key], depth + step)}`;
    }
    return `    ${tab}${key}: ${data[key]}`;
  });
  return `{\n${result.join('\n')}\n${tab}}`;
};

const stylish = (tree) => {
  const iter = (subtree, depth) => {
    const a = subtree.flatMap((item) => {
      const {
        type, key, value1, value2,
      } = item;
      const tab = (' ').repeat(depth);
      if (type === 'unchanged') {
        return `    ${tab}${key}: ${stringify(value1, depth + step)}`;
      } if (type === 'nested') {
        return `    ${tab}${key}: {\n${iter(value1, depth + step)}\n${tab}    }`;
      } if (type === 'changed') {
        return `${tab}  - ${key}: ${stringify(value1, depth + step)}\n${tab}  + ${key}: ${stringify(value2, depth + step)}`;
      } if (type === 'removed') {
        return `${tab}  - ${key}: ${stringify(value1, depth + step)}`;
      }
      return `${tab}  + ${key}: ${stringify(value1, depth + step)}`;
    });
    return `${a.join('\n')}`;
  };
  const initialDepth = 0;
  const result = iter(tree, initialDepth);
  return `{\n${result}\n}`;
};

const genDiff = (file1, file2) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const iter = (child1, child2) => {
    const keys = _.union(_.keys(_.clone(child1)), _.keys(_.clone(child2))).sort();
    return keys.flatMap((key) => {
      if (_.isPlainObject(child1[key]) && _.isPlainObject(child2[key])) {
        return { type: 'nested', key: `${[key]}`, value1: iter(child1[key], child2[key]) };
      } if (_.has(child1, key) && (!_.has(child2, key))) {
        return { type: 'removed', key: `${[key]}`, value1: child1[key] };
      } if (!_.has(child1, key) && (_.has(child2, key))) {
        return { type: 'added', key: `${[key]}`, value1: child2[key] };
      } if (_.has(child1, key) && _.has(child2, key) && child1[key] === child2[key]) {
        return { type: 'unchanged', key: `${[key]}`, value1: child1[key] };
      }
      return {
        type: 'changed', key: `${[key]}`, value1: child1[key], value2: child2[key],
      };
    });
  };
  return stylish(iter(data1, data2));
};

export default genDiff;
