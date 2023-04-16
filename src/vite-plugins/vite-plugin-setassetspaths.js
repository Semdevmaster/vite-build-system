import {parse, join} from 'node:path'

const fileFilter = /\.(jpe?g|png|svg)$/i
let viteConfig

export default function setAssetsPaths() {
  return {
    name: 'vite:set-assets-paths',
    apply: 'build',

    configResolved(config) {
      viteConfig = config
    },

    transform(src, id) {
      if (fileFilter.test(id)) {
        return {meta: {assetPath: parse(id)?.dir?.split(viteConfig.base)[1]}}
      }
    },

    generateBundle(options, bundle) {
      const assetsArray = Array.from(this.getModuleIds()).filter(id => this.getModuleInfo(id)?.meta?.assetPath);

      for (const asset of Object.values(bundle)) {
        if (asset.type !== 'asset') continue
        const id = assetsArray.find(el => el.endsWith(asset.name));
        if (!id) continue
        asset.fileName = join(this.getModuleInfo(id)?.meta?.assetPath ?? '', asset.fileName)
      }
    }
  }
}
