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
  env: {...dotenv.parse(fs.readFileSync('../.env')), ...{
    VITE_YVES_VERSION: version
  }},
  rollupDedupe: ['svelte'],
};