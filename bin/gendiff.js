#!/usr/bin/env node
import program from 'commander';
import buildDiff from '../index.js';

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const result = buildDiff(filepath1, filepath2, program.format);
    console.log(result);
  })
  .parse(process.argv);
