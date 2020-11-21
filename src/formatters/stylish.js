import _ from 'lodash';

const offset = 4;
const indent = 1;

// Пример результата:
// 0) 0          {
// 1) 4          ||||common: {
// 2) 6+2        ||||||+|follow: false

/*
 * размер отступа вычисляется по формуле глубина * размер шага,
 * но нам нужно вписать в этот отступ переданный символ
 */
const padSymbol = (symbol, depth) => {
  const suffix = `${symbol} `;
  const prefixLength = depth * offset - suffix.length;
  const prefix = ' '.repeat(prefixLength);
  return `${prefix}${suffix}`;
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = _.keys(data);
  const nestedTabs = padSymbol(' ', depth);
  const tab = padSymbol(' ', indent);
  const result = keys.map((key) => {
    const prefix = `${nestedTabs}${tab}${key}`;
    const suffix = _.isPlainObject(data[key])
      ? stringify(data[key], depth + 1)
      : `${data[key]}`;

    return `${prefix}: ${suffix}`;
  });
  return `{\n${result.join('\n')}\n${nestedTabs}}`;
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
          return `${padSymbol(' ', depth)}${key}: {\n${iter(
            children,
            depth + indent,
          )}\n${padSymbol(' ', depth)}}`;
        case 'changed':
          return `${padSymbol('-', depth)}${key}: ${stringify(
            value1,
            depth,
          )}\n${padSymbol('+', depth)}${key}: ${stringify(value2, depth)}`;
        case 'removed':
          return `${padSymbol('-', depth)}${key}: ${stringify(value, depth)}`;
        case 'added':
          return `${padSymbol('+', depth)}${key}: ${stringify(value, depth)}`;
        default:
          throw new Error(`Unknown: type: '${type}'!`);
      }
    });
    return result.join('\n');
  };
  const result = iter(tree);
  return `{\n${result}\n}`;
};
export default stylish;
