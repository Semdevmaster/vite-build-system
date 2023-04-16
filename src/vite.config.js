import {parse, resolve} from 'path';
import {readFileSync} from 'fs';
import {defineConfig, loadEnv} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import FullReload from 'vite-plugin-full-reload'
import imgConvert from './vite-plugins/vite-plugin-imgconvert'
import setAssetsPaths from "./vite-plugins/vite-plugin-setassetspaths";
import {fileURLToPath} from "url";

export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, '../')}
  return defineConfig({
    appType: 'custom',
    publicDir: false,
    cssCodeSplit: false,
    base: mode === 'production' ? `/assets/${process.env.VITE_ASSETS_VERSION}/` : '/',
    server: {
      host: false,
      port: process.env.VITE_APP_PORT,
      cors: true,
      https: {
        cert: readFileSync(`../server/certs/${process.env.VITE_SSL_CERT}`),
        key: readFileSync(`../server/certs/${process.env.VITE_SSL_KEY}`)
      }
    },
    build: {
      minify: true,
      manifest: 'assets.json',
      emptyOutDir: true,
      assetsDir: '',
      outDir: `../app/assets/${process.env.VITE_ASSETS_VERSION}`,
      modulePreload: {
        polyfill: false
      },
      rollupOptions: {
        input: [
          `assets/${process.env.VITE_ASSETS_VERSION}/js/main.js`,
          `assets/${process.env.VITE_ASSETS_VERSION}/css/style.css`,
        ],
        output: {
          assetFileNames: (assetInfo) => {
            let {ext} = parse(assetInfo.name);
            ext = ext.split('.').at(1)
            if (ext === 'css') {
              return `${ext}/[name]-[hash][extname]`;
            }
            return `[name]-[hash][extname]`;
          },
          chunkFileNames: 'js/chunks/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js'
        }
      },
    },
    plugins: [
      FullReload(
        [
          'app/core/app/plugins/smarty/*.php',
          'app/core/app/snippets/**/*.php'
        ],
        {root: resolve(__dirname, '../')}
      ),
      viteStaticCopy({
        targets: [
          {
            src: `assets/${process.env.VITE_ASSETS_VERSION}/fonts`,
            dest: ''
          },
          {
            src: `assets/${process.env.VITE_ASSETS_VERSION}/img/favicons`,
            dest: 'img'
          }
        ]
      }),
      setAssetsPaths(),
      imgConvert()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL(`./assets/${process.env.VITE_ASSETS_VERSION}`, import.meta.url)),
      }
    }
  });
}
