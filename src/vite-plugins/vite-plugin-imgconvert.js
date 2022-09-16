import sharp from 'sharp'
import path from 'path'

const fileFilter = /\.(jpe?g|png)$/i

let viteConfig

export default function imgConvert() {
  return {
    name: 'img-convert',
    enforce: 'post',
    apply: 'build',
    configResolved(config) {
      viteConfig = config
    },
    writeBundle: async (options, bundle) => {
      const images = Object.keys(bundle)
        .reduce((result, file) => fileFilter.test(file) ? [...result, file] : result, [])
      const root = viteConfig.root
      const outDir = viteConfig.build.outDir || 'dist'

      await Promise.all(images.map(async (image) => {
        const absoluteImagePath = path.resolve(root, outDir, image)
        await makeWebp(absoluteImagePath)
        await makeAvif(absoluteImagePath)
      }))
    }
  }
}

async function makeWebp(file) {
  const {dir, name} = path.parse(file)
  return sharp(file)
    .webp({
      quality: 80, smartSubsample: false, reductionEffort: 6
    })
    .toFile(`${dir}/${name}.webp`)
}

async function makeAvif(file) {
  const {dir, name} = path.parse(file)
  return sharp(file)
    .avif({
      quality: 50, speed: 0, chromaSubsampling: '4:4:4'
    })
    .toFile(`${dir}/${name}.avif`)
}
