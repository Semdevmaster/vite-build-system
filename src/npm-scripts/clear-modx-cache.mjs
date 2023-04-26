import {existsSync, rm} from 'node:fs'
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cachePath = resolve(__dirname, '../../', 'app/core/cache')

if (existsSync(cachePath)) {
  rm(cachePath, {recursive: true}, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('Папка с кэшем MODX очищена')
  })
} else {
  console.log('Папка кэша отсутствует')
}
