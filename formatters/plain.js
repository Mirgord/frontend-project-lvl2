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
  const iter = (subtree, node) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, value1, value2,
      } = item;
      if (type === 'unchanged') {
        return [];
      } if (type === 'nested') {
        return `${iter(value1, `${node}${key}.`)}`;
      } if (type === 'changed') {
        return `Property '${node}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      } if (type === 'removed') {
        return `Property '${node}${key}' was removed`;
      }
      return `Property '${node}${key}' was added with value: ${stringify(value1)}`;
    });
    return `${result.join('\n')}`;
  };
  const node = '';
  return iter(tree, node);
};
export default plain;
