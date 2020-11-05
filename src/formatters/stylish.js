import _ from 'lodash';

const step = 4;
const offset = (' ').repeat(4);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = _.keys(_.clone(data));
  const tab = (' ').repeat(depth);
  const result = keys.map((key) => {
    if (_.isPlainObject(data[key])) {
      return `${offset}${tab}${key}: ${stringify(data[key], depth + step)}`;
    }
    return `${offset}${tab}${key}: ${data[key]}`;
  });
  return `{\n${result.join('\n')}\n${tab}}`;
};
const stylish = (tree) => {
  const iter = (subtree, depth) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, value1, value2,
      } = item;
      const tab = (' ').repeat(depth);
      if (type === 'unchanged') {
        return `${offset}${tab}${key}: ${stringify(value1, depth + step)}`;
      } if (type === 'nested') {
        return `${offset}${tab}${key}: {\n${iter(value1, depth + step)}\n${tab}${offset}}`;
      } if (type === 'changed') {
        return `${tab}  - ${key}: ${stringify(value1, depth + step)}\n${tab}  + ${key}: ${stringify(value2, depth + step)}`;
      } if (type === 'removed') {
        return `${tab}  - ${key}: ${stringify(value1, depth + step)}`;
      }
      return `${tab}  + ${key}: ${stringify(value1, depth + step)}`;
    });
    return result.join('\n');
  };
  const initialDepth = 0;
  const result = iter(tree, initialDepth);
  return `{\n${result}\n}`;
};
export default stylish;
