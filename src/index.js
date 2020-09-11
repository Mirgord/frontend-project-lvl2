import  Command  from 'commander';



const getOptions = () => {
const program = Command.option(-V, --version, 'output the version number');
program.version('0.0.1');
};

export default getOptions;