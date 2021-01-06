
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import { minify } from 'uglify-es';
import resolve from 'rollup-plugin-node-resolve';


const version = require('./package.json').version;
const isProd = process.env.BUILD !== 'development';
const plugins = [
  resolve(),
  uglify.uglify({}, minify),
  buble({
    objectAssign: 'Object.assign',
    transforms: {
      forOf: false
    }
  }),
  replace({
    __VERSION__: version
  })
];
!isProd && plugins.splice(1, 1);

export default [{
  input: './src/index.js',
  output: [
    {
      file: 'dist/microdict.esm.js',
      format: 'es'
    },
    {
      file: 'dist/microdict.common.js',
      format: 'cjs'
    },
    {
      file: 'dist/microdict.min.js',
      format: 'umd',
      name: 'microdict'
      // strict: false
    }
  ],
  plugins
}]
