import _ from 'lodash';

const step = 4;
const offset = 4;

const indent = (num) => (' ').repeat(num);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = _.keys(data);
  const tab1 = indent(depth);
  const tab2 = indent(offset);
  const result = keys.map((key) => {
    const depthOfStep = depth + step;
    if (_.isPlainObject(data[key])) {
      return `${tab2}${tab1}${key}: ${stringify(data[key], depthOfStep)}`;
    }
    return `${tab2}${tab1}${key}: ${data[key]}`;
  });
  return `{\n${result.join('\n')}\n${tab1}}`;
};

const stylish = (tree) => {
  const iter = (subtree, depth) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, value1, value2,
      } = item;
      const depthOfStep = depth + step;
      const tab1 = indent(depth);
      const tab2 = indent(offset);
      switch (type) {
        case 'unchanged':
          return `${tab2}${tab1}${key}: ${stringify(value1, depthOfStep)}`;
        case 'nested':
          return `${tab2}${tab1}${key}: {\n${iter(value1, depthOfStep)}\n${tab1}${tab2}}`;
        case 'changed':
          return `${tab1}  - ${key}: ${stringify(value1, depthOfStep)}\n${tab1}  + ${key}: ${stringify(value2, depthOfStep)}`;
        case 'removed':
          return `${tab1}  - ${key}: ${stringify(value1, depthOfStep)}`;
        case 'added':
          return `${tab1}  + ${key}: ${stringify(value1, depthOfStep)}`;
        default:
          throw new Error(`Unknown order state: '${type}'!`);
      }
    });
    return result.join('\n');
  };
  const initialDepth = 0;
  const result = iter(tree, initialDepth);
  console.log(`{\n${result}\n}`);
  return `{\n${result}\n}`;
};
export default stylish;
