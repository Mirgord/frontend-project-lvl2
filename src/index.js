import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import readFile from './utils.js';
import buildTree from './buildTree.js';

const getFormat = (dataFormat) => path.extname(dataFormat).slice(1);

const getData = (filepath) => {
  const data = readFile(filepath);
  const formatName = getFormat(filepath);
  const parsedData = parse(data, formatName);
  return parsedData;
};

const buildDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};

export default buildDiff;
