import _ from 'lodash';

const step = 1;
const offset = 4;
const prefixOffset = 2;

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const indentSize = depth * offset;
  const keyIndent = ' '.repeat(indentSize + offset);
  const bracketIndent = ' '.repeat(indentSize);
  const keys = _.keys(data);
  const result = keys.map((key) => {
    const prefix = `${keyIndent}${key}`;
    const suffix = stringify(data[key], depth + step);
    return `${prefix}: ${suffix}`;
  });
  return `{\n${result}\n${bracketIndent}}`;
};

const stylish = (tree) => {
  const iter = (subtree, depth = 1) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, children, value, value1, value2,
      } = item;
      const indentSize = depth * offset;
      const keyIndent = ' '.repeat(indentSize - prefixOffset);
      const bracketIndent = ' '.repeat(indentSize);
      switch (type) {
        case 'unchanged':
          return `${keyIndent}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${keyIndent}  ${key}: {\n${iter(children, depth + step)}\n${bracketIndent}}`;
        case 'changed':
          return `${keyIndent}- ${key}: ${stringify(value1, depth)}\n${keyIndent}+ ${key}: ${stringify(value2, depth)}`;
        case 'removed':
          return `${keyIndent}- ${key}: ${stringify(value, depth)}`;
        case 'added':
          return `${keyIndent}+ ${key}: ${stringify(value, depth)}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    return result;
  };
  const result = iter(tree);
  return `{\n${result.join().split(',').join('\n')}\n}`;
};
export default stylish;
