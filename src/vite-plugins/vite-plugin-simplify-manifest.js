import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

let outputDir

export default function simplifyManifest () {
  return {
    name: 'manifest-path-prefix',
    apply: 'build',
    configResolved (config) {
      outputDir = config.build.outDir
    },
    writeBundle () {
      const manifestPath = resolve(outputDir, 'assets.json')

      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))

        const updatedManifest = {}
        for (const key in manifest) {
          const asset = manifest[key]
          updatedManifest[asset.src || key] = `assets/v1/${asset.file}`
        }

        writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2))
        console.log('Манифест успешно упрощен и обновлен.')
      } catch (error) {
        console.error('Ошибка при чтении или записи манифеста:', error)
      }
    },
  }
}
