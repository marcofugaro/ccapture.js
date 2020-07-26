import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default [
	// main bundle
	{
		input: 'src/CCapture.js',
		plugins: [nodeResolve(), commonjs(), terser()],
		output: {
			format: 'umd',
			name: 'CCapture',
			file: 'build/CCapture.js',
			compact: true,
		}
	},
	// lite bundle
	{
		input: 'src/CCapture.js',
		plugins: [nodeResolve(), commonjs(), terser()],
		external: ['downloadjs', 'gif.js/dist/gif.js', 'webm-writer', 'ffmpegserver.js/dist/ffmpegserver.js'],
		output: {
			format: 'umd',
			name: 'CCapture',
			file: 'build/CCapture.lite.js',
			compact: true,
			globals: {
				'downloadjs': 'download',
				'gif.js/dist/gif.js': 'GIF',
				'webm-writer': 'WebMWriter',
				'ffmpegserver.js/dist/ffmpegserver.js': 'FFMpegServer',
			},
		}
	},
	// module bundle
	{
		input: 'src/CCapture.js',
		plugins: [nodeResolve(), commonjs()],
    output: {
			format: 'esm',
			file: `build/CCapture.module.js`,
		},
  },
];