import fs from 'fs'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cachePath = path.resolve(__dirname, '../../', 'app/core/cache')

if (fs.existsSync(cachePath)) {
  fs.rm(cachePath, {recursive: true}, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('Папка с кэшем MODX очищена')
  })
} else {
  console.log('Папка кэша отсутствует')
}

