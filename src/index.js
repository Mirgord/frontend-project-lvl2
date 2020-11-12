import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
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
const getFormat = (dataFormat) => path.extname(dataFormat).slice(1);

const getData = (filepath) => {
  const data = readFile(filepath);
  const formatName = getFormat(filepath);
  const parsedData = parse(data, formatName);
  return parsedData;
};

const buildDiff = (filepath1, filepath2, formatName) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};

export default buildDiff;
