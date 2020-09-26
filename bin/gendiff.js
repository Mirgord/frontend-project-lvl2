#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .addHelpCommand(false)
  .parse(process.argv);

program
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  })
  .parse(process.argv);
