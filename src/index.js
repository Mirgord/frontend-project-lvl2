import _ from 'lodash';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import readFile from './utils.js';

const buildTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  return keys.flatMap((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { type: 'nested', key, children: buildTree(obj1[key], obj2[key]) };
    } if (_.has(obj1, key) && (!_.has(obj2, key))) {
      return { type: 'removed', key, value: obj1[key] };
    } if (!_.has(obj1, key) && (_.has(obj2, key))) {
      return { type: 'added', key, value: obj2[key] };
    } if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
      return { type: 'unchanged', key, value: obj1[key] };
    }
    return {
      type: 'changed', key, value1: obj1[key], value2: obj2[key],
    };
  });
};

const format = (name) => name.split('.').slice(1).join(' ');

const buildDiff = (filepath1, filepath2, formatName) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const file1Format = format(filepath1);
  const file2Format = format(filepath2);
  const parsedData1 = parse(data1, file1Format);
  const parsedData2 = parse(data2, file2Format);
  const tree = buildTree(parsedData1, parsedData2);
  return formatter(tree, formatName);
};

export default buildDiff;
