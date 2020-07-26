import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [nodeResolve(), commonjs()];

export default [
	{
		input: 'src/CCapture.js',
		plugins,
		output: {
			format: 'umd',
			name: 'CCapture',
			file: 'build/CCapture.js',
			compact: true,
		}
	},
	{
		input: 'src/CCapture.js',
		plugins,
    output: {
			format: 'esm',
			file: `build/CCapture.module.js`,
		},
  },
];