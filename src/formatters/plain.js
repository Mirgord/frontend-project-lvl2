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
      const propertyPath = `${fullpath}${key}`;
      switch (type) {
        case 'unchanged':
          return [];
        case 'nested':
          return `${iter(children, `${propertyPath}.`)}`;
        case 'changed':
          return `Property '${propertyPath}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'removed':
          return `Property '${propertyPath}' was removed`;
        case 'added':
          return `Property '${propertyPath}' was added with value: ${stringify(value)}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    return result.join('\n');
  };
  const result = iter(tree);
  return result;
};
export default plain;
