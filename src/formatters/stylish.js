import _ from 'lodash';

const offset = 4;
const step = 1;

const padSymbol = (symbol, depth) => {
  const suffix = `${symbol} `;
  const prefixLength = depth * offset - suffix.length;
  const prefix = ' '.repeat(prefixLength);
  return `${prefix}${suffix}`;
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const keys = _.keys(data);
  const result = keys.map((key) => {
    const prefix = `${padSymbol(' ', depth + step)}${key}`;
    const suffix = stringify(data[key], depth + step);
    return `${prefix}: ${suffix}`;
  });
  return `{\n${result.join('\n')}\n${padSymbol(' ', depth)}}`;
};

const stylish = (tree) => {
  const iter = (subtree, depth = 1) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, children, value, value1, value2,
      } = item;
      switch (type) {
        case 'unchanged':
          return `${padSymbol(' ', depth)}${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${padSymbol(' ', depth)}${key}: {\n${iter(children, depth + step)}\n${padSymbol(' ', depth)}}`;
        case 'changed':
          return `${padSymbol('-', depth)}${key}: ${stringify(value1, depth)}\n${padSymbol('+', depth)}${key}: ${stringify(value2, depth)}`;
        case 'removed':
          return `${padSymbol('-', depth)}${key}: ${stringify(value, depth)}`;
        case 'added':
          return `${padSymbol('+', depth)}${key}: ${stringify(value, depth)}`;
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
