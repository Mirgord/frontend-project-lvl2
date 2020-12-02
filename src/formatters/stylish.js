import _ from 'lodash';

const step = 1;
const indent = 4;

const getTab = (depth, gap = ' ') => _.padStart(gap, depth * indent);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const tab = getTab(depth);
  const offset = getTab(step);
  const keys = _.keys(data);
  const result = keys.map((key) => {
    const prefix = `${tab}${offset}${key}`;
    const suffix = stringify(data[key], depth + step);
    return `${prefix}: ${suffix}`;
  });
  return `{\n${result.join('\n')}\n${tab}}`;
};

const stylish = (tree) => {
  const iter = (subtree, depth = 1) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, children, value, value1, value2,
      } = item;
      const tab = getTab(depth);
      switch (type) {
        case 'unchanged':
          return `${getTab(depth, '  ')}${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${getTab(depth, '  ')}${key}: {\n${iter(children, depth + step)}\n${tab}}`;
        case 'changed':
          return `${getTab(depth, '- ')}${key}: ${stringify(value1, depth)}\n${getTab(depth, '+ ')}${key}: ${stringify(value2, depth)}`;
        case 'removed':
          return `${getTab(depth, '- ')}${key}: ${stringify(value, depth)}`;
        case 'added':
          return `${getTab(depth, '+ ')}${key}: ${stringify(value, depth)}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    return result.join('\n');
  };
  const result = iter(tree);
  return `{\n${result}\n}`;
};
export default stylish;
