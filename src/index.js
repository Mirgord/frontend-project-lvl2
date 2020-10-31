import _ from 'lodash';
import readFile from './parsers.js';

const gendiff = (file1, file2) => {
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
  return iter(data1, data2);
};

export default gendiff;
