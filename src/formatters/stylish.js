import _ from 'lodash';

const step = 4;

const tabFormatter = (depth) => [depth, step].map((num) => (' ').repeat(num));

const stepIntoDepths = (depth) => depth + step;

const stringify = (data, initialDepth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = _.keys(data);
  const [tabedProgression, tab] = tabFormatter(initialDepth);
  const depth = stepIntoDepths(initialDepth);
  const result = keys.map((key) => {
    const prefix = `${tab}${tabedProgression}${key}`;
    const suffix = _.isPlainObject(data[key]) ? stringify(data[key], depth) : `${data[key]}`;

    return `${prefix}: ${suffix}`;
  });
  return `{\n${result.join('\n')}\n${tabedProgression}}`;
};

const stylish = (tree) => {
  const iter = (subtree, initialDepth = 0) => {
    const result = subtree.flatMap((item) => {
      const {
        type, key, children, value, value1, value2,
      } = item;
      const depth = stepIntoDepths(initialDepth);
      const [tabedProgression, tab] = tabFormatter(initialDepth);
      switch (type) {
        case 'unchanged':
          return `${tabedProgression}${tab}${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${tabedProgression}${tab}${key}: {\n${iter(children, depth)}\n${tab}${tabedProgression}}`;
        case 'changed':
          return `${tabedProgression}  - ${key}: ${stringify(value1, depth)}\n${tabedProgression}  + ${key}: ${stringify(value2, depth)}`;
        case 'removed':
          return `${tabedProgression}  - ${key}: ${stringify(value, depth)}`;
        case 'added':
          return `${tabedProgression}  + ${key}: ${stringify(value, depth)}`;
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
