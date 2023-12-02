import prod from './prod';
import dev from './dev';

declare const env: typeof prod | typeof dev;
export default env;
