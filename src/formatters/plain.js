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
  const iter = (subtree, acc) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, children, value, value1, value2,
      } = item;
      const path = `${acc}${key}`;
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
          throw new Error(`Unknown order state: '${type}'!`);
      }
    });
    return result.join('\n');
  };
  const acc = '';
  const result = iter(tree, acc);
  console.log(result);
  return result;
};
export default plain;
