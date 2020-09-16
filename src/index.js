import program from 'commander';

const getConfiguration = () => program
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]' , 'output format')
    .helpOption('-h, --help' ,  'output usage information' ) 
    .addHelpCommand(false)
    .parse(process.argv);

export default getConfiguration;
