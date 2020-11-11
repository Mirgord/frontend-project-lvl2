import _ from 'lodash';

const step = 4;

const indent = (num) => (' ').repeat(num);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = _.keys(data);
  const generateTab = indent(depth);
  const tab = indent(step);
  const result = keys.map((key) => {
    const depthOfStep = depth + step;
    const prefix = `${tab}${generateTab}${key}`;
    const suffix = _.isPlainObject(data[key]) ? stringify(data[key], depthOfStep) : `${data[key]}`;

    return `${prefix}: ${suffix}`;
  });
  return `{\n${result.join('\n')}\n${generateTab}}`;
};

const stylish = (tree) => {
  const iter = (subtree, depth = 0) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, children, value, value1, value2,
      } = item;
      const depthOfStep = depth + step;
      const generateTab = indent(depth);
      const tab = indent(step);
      switch (type) {
        case 'unchanged':
          return `${generateTab}${tab}${key}: ${stringify(value, depthOfStep)}`;
        case 'nested':
          return `${generateTab}${tab}${key}: {\n${iter(children, depthOfStep)}\n${tab}${generateTab}}`;
        case 'changed':
          return `${generateTab}  - ${key}: ${stringify(value1, depthOfStep)}\n${generateTab}  + ${key}: ${stringify(value2, depthOfStep)}`;
        case 'removed':
          return `${generateTab}  - ${key}: ${stringify(value, depthOfStep)}`;
        case 'added':
          return `${generateTab}  + ${key}: ${stringify(value, depthOfStep)}`;
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
