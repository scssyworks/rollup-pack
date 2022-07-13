import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const y = yargs(hideBin(process.argv));
export const args = y.option('name', {
    alias: 'n',
    type: 'string',
    description: 'Name or path where rollup-pack scaffolds the project'
}).argv;