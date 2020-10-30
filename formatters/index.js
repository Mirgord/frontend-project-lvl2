import plain from './plain.js';
import stylish from './stylish.js';
import jsonStringify from './json.js';

const getFormatter = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return jsonStringify(data);
    default:
      throw new Error(`Unknown order state: '${format}'!`);
  }
};
export default getFormatter;
