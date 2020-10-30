#!/usr/bin/env node
import program from 'commander';
import gendiff from '../src/index.js';
import getFormatter from '../formatters/index.js';

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .addHelpCommand(false)
  .parse(process.argv);

program
  .action((filepath1, filepath2) => {
    console.log(getFormatter(gendiff(filepath1, filepath2), program.format));
  })
  .parse(process.argv);
