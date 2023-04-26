import {resolve} from 'node:path';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from "node:url";
import {defineConfig, loadEnv} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import FullReload from 'vite-plugin-full-reload'
import imgConvert from './vite-plugins/vite-plugin-imgconvert'

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
      write: true,
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
            const assetExtToFolderMap = new Map([
              [/.(jpe?g|png|svg)$/, 'images'],
              [/.(mp4|mov|ts|flv|avi)$/, 'video'],
              [/.(mp3|aac|vaw|flac)$/, 'audio'],
              [/.(woff2?|ttf)$/, 'fonts'],
            ])

            let assetsFolder = '[ext]'

            for (const [extension, folder] of assetExtToFolderMap.entries()) {
              if (extension.test(assetInfo.name)) {
                assetsFolder = folder
              }
            }

            return `${assetsFolder}/[name]-[hash][extname]`;
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
            src: `assets/${process.env.VITE_ASSETS_VERSION}/img/favicons`,
            dest: 'images'
          }
        ]
      }),
      imgConvert()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL(`./assets/${process.env.VITE_ASSETS_VERSION}`, import.meta.url)),
      }
    }
  });
}
