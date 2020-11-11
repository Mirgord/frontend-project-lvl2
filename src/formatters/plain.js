import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  } if (_.isString(data)) {
    return `'${data}'`;
  }
  return data;
};

const plain = (tree) => {
  const iter = (subtree, fullpath = '') => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, children, value, value1, value2,
      } = item;
      const path = `${fullpath}${key}`;
      switch (type) {
        case 'unchanged':
          return [];
        case 'nested':
          return `${iter(children, `${path}.`)}`;
        case 'changed':
          return `Property '${path}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'added':
          return `Property '${path}' was added with value: ${stringify(value)}`;
        default:
          throw new Error(`Unknown: '${type}'!`);
      }
    });
    return result.join('\n');
  };
  const result = iter(tree);
  return result;
};
export default plain;
