import sharp from 'sharp'
import { join } from 'node:path'

async function raw(path) {
  return sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
}

async function writeRaw(path, data, width, height) {
  await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(path)
}

async function fillDashboardGray(path) {
  const { data, info } = await raw(path)
  const { width, height } = info
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const avg = (r + g + b) / 3
      const sat = Math.max(r, g, b) - Math.min(r, g, b)
      const rightGutter = x > width * 0.88 && sat < 40 && avg > 130
      const pageGray = sat < 32 && avg > 188
      const bluishPage = b > r + 1 && sat < 42 && avg > 180 && avg < 252
      if (pageGray || rightGutter || bluishPage) {
        data[i] = 255
        data[i + 1] = 255
        data[i + 2] = 255
      }
    }
  }
  await writeRaw(path, data, width, height)
}

async function cropRightGrayPanel(path) {
  const { data, info } = await raw(path)
  const { width, height } = info

  function columnIsPanel(x) {
    let samples = 0
    let gray = 0
    let sum = 0
    let sumSq = 0
    for (let y = 0; y < height; y += 3) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const avg = (r + g + b) / 3
      const sat = Math.max(r, g, b) - Math.min(r, g, b)
      samples += 1
      sum += avg
      sumSq += avg * avg
      if (sat < 18 && avg > 28 && avg < 95) gray += 1
    }
    const mean = sum / samples
    const variance = sumSq / samples - mean * mean
    return gray / samples > 0.72 && variance < 90
  }

  let cropWidth = width
  for (let x = width - 1; x > width * 0.55; x--) {
    if (columnIsPanel(x)) {
      cropWidth = x
      continue
    }
    break
  }

  if (cropWidth >= width - 4) return
  const tmp = `${path}.tmp.png`
  await sharp(path).extract({ left: 0, top: 0, width: cropWidth, height }).png().toFile(tmp)
  const fs = await import('node:fs/promises')
  await fs.copyFile(tmp, path)
  await fs.unlink(tmp)
}

const campus = join(process.cwd(), 'public', 'images', 'smart-campus')
const game = join(process.cwd(), 'public', 'images', 'shadow-warrior')

await fillDashboardGray(join(campus, 'dashboard.png'))
await fillDashboardGray(join(campus, 'student-dashboard.png'))

async function cropScrollbar(path) {
  const { width, height } = await sharp(path).metadata()
  const cut = Math.min(36, Math.floor(width * 0.035))
  const tmp = `${path}.tmp.png`
  await sharp(path)
    .extract({ left: 0, top: 0, width: width - cut, height })
    .png()
    .toFile(tmp)
  const fs = await import('node:fs/promises')
  await fs.copyFile(tmp, path)
  await fs.unlink(tmp)
}

await cropScrollbar(join(campus, 'dashboard.png'))
await cropScrollbar(join(campus, 'student-dashboard.png'))
await cropRightGrayPanel(join(game, 'combat.png'))
await cropRightGrayPanel(join(game, 'boss-encounter.png'))
console.log('filled dashboard gray and cropped game side panels')
