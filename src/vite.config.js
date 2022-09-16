import {parse, resolve} from 'path';
import {readFileSync} from 'fs';
import {defineConfig, loadEnv} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import FullReload from 'vite-plugin-full-reload'
import imgConvert from './vite-plugins/vite-plugin-imgconvert'

export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, '../')}
  return defineConfig({
    publicDir: false,
    cssCodeSplit: false,
    base: mode === 'production' ? `/assets/${process.env.VITE_ASSETS_VERSION}/` : '/',
    server: {
      host: false,
      port: process.env.VITE_APP_PORT,
      cors: true,
      /*https: {
        cert: readFileSync(`../server/nginx/ssl/${process.env.VITE_SSL_CERT}`),
        key: readFileSync(`../server/nginx/ssl/${process.env.VITE_SSL_KEY}`)
      }*/
    },
    build: {
      minify: true,
      manifest: 'assets.json',
      emptyOutDir: true,
      assetsDir: '',
      outDir: `../app/assets/${process.env.VITE_ASSETS_VERSION}`,
      polyfillModulePreload: false,
      rollupOptions: {
        input: [
          `assets/${process.env.VITE_ASSETS_VERSION}/js/main.js`,
          `assets/${process.env.VITE_ASSETS_VERSION}/css/style.css`,
        ],
        output: {
          assetFileNames: (assetInfo) => {
            const {dir, ext} = parse(assetInfo.name)
            switch (ext) {
              case '.svg':
              case '.png':
              case '.jpg':
              case '.jpeg':
                const resultPath = dir.substring(dir.lastIndexOf(process.env.VITE_ASSETS_VERSION) + 3)
                return `${resultPath}/[name]-[hash][extname]`
              default:
                return `[ext]/[name]-[hash][extname]`;
            }
          },
          chunkFileNames: 'js/chunks/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js'
        }
      },
    },
    plugins: [
      FullReload([
          'app/core/app/plugins/smarty/*.php',
          'app/core/app/snippets/**/*.php'
        ],
        {root: resolve(__dirname, '../')}),
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
      imgConvert(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, `./assets/${process.env.VITE_ASSETS_VERSION}`)
      }
    }
  });
}
