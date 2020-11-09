import yaml from 'js-yaml';
import readFile from './utils.js';

const getFormat = (name) => name.split('.').slice(1).join(' ');

const parse = (name) => {
  const data = readFile(name);
  const format = getFormat(name);
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    default:
      throw new Error(`Unknown order state: '${format}'!`);
  }
};

export default parse;
