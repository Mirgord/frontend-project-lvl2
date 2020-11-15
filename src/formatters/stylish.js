import _ from 'lodash';

const step = 4;

const makeTab = (count) => (' ').repeat(count);

const stepIntoDepths = (depth) => depth + step;

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = _.keys(data);
  const deepening = stepIntoDepths(depth);
  const tabedSum = makeTab(depth);
  const tab = makeTab(step);
  const result = keys.map((key) => {
    const prefix = `${tabedSum}${tab}${key}`;
    const suffix = _.isPlainObject(data[key]) ? stringify(data[key], deepening) : `${data[key]}`;

    return `${prefix}: ${suffix}`;
  });
  return `{\n${result.join('\n')}\n${tabedSum}}`;
};

const stylish = (tree) => {
  const iter = (subtree, depth = 0) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, children, value, value1, value2,
      } = item;
      const deepening = stepIntoDepths(depth);
      const tabedSum = makeTab(depth);
      const tab = makeTab(step);
      switch (type) {
        case 'unchanged':
          return `${tabedSum}${tab}${key}: ${stringify(value, deepening)}`;
        case 'nested':
          return `${tabedSum}${tab}${key}: {\n${iter(children, deepening)}\n${tab}${tabedSum}}`;
        case 'changed':
          return `${tabedSum}  - ${key}: ${stringify(value1, deepening)}\n${tabedSum}  + ${key}: ${stringify(value2, deepening)}`;
        case 'removed':
          return `${tabedSum}  - ${key}: ${stringify(value, deepening)}`;
        case 'added':
          return `${tabedSum}  + ${key}: ${stringify(value, deepening)}`;
        default:
          throw new Error(`Unknown: '${type}'!`);
      }
    });
    return result.join('\n');
  };
  const result = iter(tree);
  return `{\n${result}\n}`;
};
export default stylish;
