import sharp from 'sharp'
import {resolve, parse} from 'node:path'

const fileFilter = /\.(jpe?g|png)$/i

let viteConfig

export default function imgConvert() {
  return {
    name: 'vite:img-convert',
    enforce: 'post',
    apply: 'build',

    configResolved(config) {
      viteConfig = config
    },

    writeBundle: async (options, bundle) => {
      const images = Object.values(bundle)
        .reduce((result, file) => fileFilter.test(file.fileName) ? [...result, file.fileName] : result, [])
      const root = viteConfig.root
      const outDir = viteConfig.build.outDir || 'dist'

      await Promise.all(images.map(async (image) => {
        const absoluteImagePath = resolve(root, outDir, image)
        await makeWebp(absoluteImagePath)
        await makeAvif(absoluteImagePath)
      }))
    }
  }
}

async function makeWebp(file) {
  const {dir, name} = parse(file)
  return sharp(file)
    .webp({
      quality: 80, smartSubsample: false, reductionEffort: 6
    })
    .toFile(`${dir}/${name}.webp`)
}

async function makeAvif(file) {
  const {dir, name} = parse(file)
  return sharp(file)
    .avif({
      quality: 50, speed: 0, chromaSubsampling: '4:4:4'
    })
    .toFile(`${dir}/${name}.avif`)
}
