#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';
import getFormatter from '../src/formatters/index.js';

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(getFormatter(genDiff(filepath1, filepath2), program.format));
  })
  .parse(process.argv);
