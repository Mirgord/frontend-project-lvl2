import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  return keys.flatMap((key) => {
    if (_.has(obj1, key) && (!_.has(obj2, key))) {
      return { type: 'removed', key, value: obj1[key] };
    } if (!_.has(obj1, key) && (_.has(obj2, key))) {
      return { type: 'added', key, value: obj2[key] };
    } if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { type: 'nested', key, children: genDiff(obj1[key], obj2[key]) };
    } if (_.isEqual(obj1[key], obj2[key])) {
      return { type: 'unchanged', key, value: obj1[key] };
    }
    return {
      type: 'changed', key, value1: obj1[key], value2: obj2[key],
    };
  });
};

export default genDiff;
