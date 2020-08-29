import svelte from 'vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import dotenv from 'dotenv';
import fs from 'fs';
import { version } from '../package.json';

export default {
  plugins: [
    svelte({
      preprocess: preprocess({
        postcss: true
      })
    })
  ],
  assetsDir: 'build',
  rollupOutputOptions: {
    format: 'iife'
  },
  env: {...dotenv.parse(fs.readFileSync('../.env')), ...{
    VITE_YVES_VERSION: version
  }},
  rollupDedupe: ['svelte'],
  rollupInputOptions: {
    plugins: [
      require('@rollup/plugin-commonjs')({
        extensions: ['.js', '.cjs'],
        transformMixedEsModules: true,
        ignore: ['node_modules/@feathersjs/client/*']
      })
    ]
  },
  optimizeDeps: {
    // TODO: remove this if and when https://github.com/vitejs/vite/issues/699 is implemented
    exclude: [
      '@feathersjs/authentication',
      '@feathersjs/authentication-local',
      '@feathersjs/configuration',
      '@feathersjs/express',
      '@feathersjs/socketio',
      '@feathersjs/transport-commons',
      'compression',
      'core-js',
      'cors',
      'cross-env',
      'dotenv',
      'feathers-mongoose',
      'form-data',
      'helmet',
      'mongodb-core',
      'mongoose',
      'winston'
    ],
    include: [
      '@feathersjs/client',
      '@feathersjs/socketio-client',
      'axios',
      'date-fns'
    ]
  }
};