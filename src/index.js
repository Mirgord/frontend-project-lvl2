import program from 'commander';

const getConfiguration = () => program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help' ,  'output usage information' ) 
    .addHelpCommand(false)
    .parse(process.argv);

export default getConfiguration;
