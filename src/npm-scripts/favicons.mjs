import sharp from 'sharp'
import dotenv from 'dotenv';
import path from 'path'

dotenv.config({path: path.resolve(process.cwd(), '../', '.env')})

const faviconsPath = path.resolve(process.cwd(), 'assets', process.env.APP_ASSETS_VERSION)

const faviconsBuild = () => {
  const sharpStream = sharp(
    `${faviconsPath}/img/favicons/favicon.svg`,
    {
      failOnError: false
    })
  const promises = []
  promises.push(
    sharpStream
      .clone()
      .resize(16, 16)
      .toFile(`${faviconsPath}/img/favicons/favicon.ico`)
  )
  promises.push(
    sharpStream
      .clone()
      .resize(180, 180)
      .png()
      .toFile(`${faviconsPath}/img/favicons/favicon-180x180.png`)
  );
  promises.push(
    sharpStream
      .clone()
      .resize(192, 192)
      .png()
      .toFile(`${faviconsPath}/img/favicons/favicon-192x192.png`)
  );
  promises.push(
    sharpStream
      .clone()
      .resize(512, 512)
      .png()
      .toFile(`${faviconsPath}/img/favicons/favicon-512x512.png`)
  );
  Promise.all(promises)
    .then(res => {
      console.log("Favicons is generated!");
    })
    .catch(err => {
      console.error("Error processing favicons files!", err);
    });
}

faviconsBuild()
