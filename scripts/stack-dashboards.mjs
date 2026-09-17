import sharp from 'sharp'
import { join } from 'node:path'

const srcDir = join(process.cwd(), 'public', 'images', 'DBMSimagesFinalFrontend')
const destDir = join(process.cwd(), 'public', 'images', 'smart-campus')
const gradeSrc = join(
  process.env.USERPROFILE || '',
  '.cursor',
  'projects',
  'c-Users-MarkShop-Desktop-my-portfolio',
  'assets',
  'c__Users_MarkShop_AppData_Roaming_Cursor_User_workspaceStorage_6b3d4416d21bb7da7b1240f493529835_images_Dashboard10-d1e0c61f-06d6-4a1e-ae25-84c15fdbaf03.png',
)

function lum(data, width, x, y) {
  const i = (y * width + x) * 4
  return (data[i] + data[i + 1] + data[i + 2]) / 3
}

function rowLightRatio(data, width, y, x0Ratio, x1Ratio) {
  let light = 0
  let total = 0
  const x0 = Math.floor(width * x0Ratio)
  const x1 = Math.floor(width * x1Ratio)
  const step = Math.max(1, Math.floor((x1 - x0) / 40))
  for (let x = x0; x < x1; x += step) {
    total += 1
    if (lum(data, width, x, y) > 175) light += 1
  }
  return light / Math.max(1, total)
}

async function loginCrop(path) {
  const image = sharp(path)
  const { width, height } = await image.metadata()
  const { data } = await image.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  function isBluePage(y) {
    const mid = (y * width + Math.floor(width * 0.5)) * 4
    const left = (y * width + Math.floor(width * 0.08)) * 4
    const midBlue = data[mid + 2] > 90 && data[mid + 2] > data[mid] + 12
    const leftBlue = data[left + 2] > 80 && data[left + 2] > data[left] + 8
    return midBlue && leftBlue
  }

  let top = 0
  for (let y = 0; y < height; y++) {
    if (isBluePage(y)) {
      top = y
      break
    }
  }
  let bottom = height
  for (let y = height - 1; y > top; y--) {
    if (isBluePage(y)) {
      bottom = y + 1
      break
    }
  }
  return { left: 0, top, width, height: Math.max(1, bottom - top) }
}

async function chromeBox(path) {
  const image = sharp(path)
  const { width, height } = await image.metadata()
  const { data } = await image.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  let top = 0
  for (let y = 0; y < height - 8; y++) {
    let ok = true
    for (let n = 0; n < 8; n++) {
      if (rowLightRatio(data, width, y + n, 0.28, 0.98) < 0.72) {
        ok = false
        break
      }
    }
    if (ok) {
      top = y
      break
    }
  }

  let bottom = height
  for (let y = height - 1; y > top; y--) {
    if (rowLightRatio(data, width, y, 0.28, 0.98) > 0.55) {
      bottom = y + 1
      break
    }
  }

  return { left: 0, top, width, height: Math.max(1, bottom - top) }
}

async function sidebarWidth(buffer) {
  const image = sharp(buffer)
  const { width, height } = await image.metadata()
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  function atY(ratio) {
    const y = Math.min(height - 2, Math.floor(height * ratio))
    let dark = 0
    for (let x = 0; x < width * 0.5; x++) {
      if (lum(data, width, x, y) < 90) dark += 1
      else if (dark > 40) return Math.min(x + 18, Math.floor(width * 0.42))
      else dark = 0
    }
    return 0
  }

  return Math.max(atY(0.28), atY(0.45), atY(0.62), atY(0.78))
}

async function contentPane(path, { dropSidebar = true, trimTop = 0, trimBottom = 0 } = {}) {
  const box = await chromeBox(path)
  let buf = await sharp(path).extract(box).png().toBuffer()
  if (dropSidebar) {
    const side = await sidebarWidth(buf)
    const meta = await sharp(buf).metadata()
    if (side > 80) {
      buf = await sharp(buf)
        .extract({ left: side, top: 0, width: meta.width - side, height: meta.height })
        .png()
        .toBuffer()
    }
  }
  if (trimTop || trimBottom) {
    const meta = await sharp(buf).metadata()
    const top = Math.min(trimTop, meta.height - 40)
    const height = Math.max(40, meta.height - top - trimBottom)
    buf = await sharp(buf).extract({ left: 0, top, width: meta.width, height }).png().toBuffer()
  }
  return buf
}

async function splitPageCards(buf) {
  const image = sharp(buf)
  const { width, height } = await image.metadata()
  const { data } = await image.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  function isGutter(y) {
    let gray = 0
    let n = 0
    const x0 = Math.floor(width * 0.08)
    const x1 = Math.floor(width * 0.92)
    for (let x = x0; x < x1; x += 3) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const avg = (r + g + b) / 3
      const sat = Math.max(r, g, b) - Math.min(r, g, b)
      if (sat < 14 && avg > 222 && avg < 248) gray += 1
      n += 1
    }
    return gray / n > 0.8
  }

  const gutterRun = Array(height).fill(false)
  for (let y = 0; y < height; y++) gutterRun[y] = isGutter(y)

  const cards = []
  let start = -1
  let gap = 0
  for (let y = 0; y <= height; y++) {
    const gutter = y < height ? gutterRun[y] : true
    if (!gutter) {
      if (start < 0) start = y
      gap = 0
      continue
    }
    if (start < 0) continue
    gap += 1
    if (gap >= 8 || y === height) {
      const end = y - gap + 1
      if (end - start > 48) cards.push({ left: 0, top: start, width, height: end - start })
      start = -1
      gap = 0
    }
  }

  const out = []
  for (const box of cards) {
    out.push(await sharp(buf).extract(box).png().toBuffer())
  }
  return out
}

async function trimPageGray(buf) {
  const image = sharp(buf)
  const { width, height } = await image.metadata()
  const { data } = await image.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const avg = (r + g + b) / 3
      const sat = Math.max(r, g, b) - Math.min(r, g, b)
      const pageGray = sat < 14 && avg > 222 && avg < 248
      if (pageGray) continue
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }
  if (maxX <= minX || maxY <= minY) return buf
  return sharp(buf)
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png()
    .toBuffer()
}

async function unifyEqualStack(bufs, width) {
  const parts = []
  for (const buf of bufs) {
    const trimmed = await trimPageGray(buf)
    parts.push(await sharp(trimmed).resize({ width }).png().toBuffer())
  }
  let y = 0
  const composite = []
  for (const part of parts) {
    const meta = await sharp(part).metadata()
    composite.push({ input: part, left: 0, top: y })
    y += meta.height
  }
  return sharp({
    create: {
      width,
      height: y,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite(composite)
    .png()
    .toBuffer()
}

async function stackVertical(buffers) {
  const metas = []
  for (const buf of buffers) {
    metas.push(await sharp(buf).metadata())
  }
  const width = Math.max(...metas.map((meta) => meta.width))
  const resized = []
  for (const buf of buffers) {
    resized.push(await sharp(buf).resize({ width }).png().toBuffer())
  }
  let y = 0
  const composite = []
  for (const buf of resized) {
    const meta = await sharp(buf).metadata()
    composite.push({ input: buf, top: y, left: 0 })
    y += meta.height
  }
  return sharp({
    create: {
      width,
      height: y,
      channels: 3,
      background: { r: 238, g: 242, b: 246 },
    },
  })
    .composite(composite)
    .png()
}

async function recolorBlackHeader(path) {
  const image = sharp(path)
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height } = info
  const headerRows = []
  for (let y = 0; y < height; y++) {
    let blackish = 0
    let samples = 0
    for (let x = Math.floor(width * 0.22); x < width; x += 4) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      samples += 1
      if (r < 50 && g < 50 && b < 50 && b - r < 14) blackish += 1
    }
    if (blackish / samples >= 0.32) headerRows.push(y)
  }

  let tableLeft = Math.floor(width * 0.22)
  for (const y of headerRows) {
    for (let x = Math.floor(width * 0.12); x < width * 0.45; x++) {
      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (r < 50 && g < 50 && b < 50 && b - r < 14) {
        tableLeft = Math.min(tableLeft, x)
        break
      }
    }
  }

  for (const y of headerRows) {
    for (let x = tableLeft; x < width; x++) {
      const i = (y * width + x) * 4
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3
      if (lum > 132) {
        data[i] = 255
        data[i + 1] = 255
        data[i + 2] = 255
      } else {
        data[i] = 37
        data[i + 1] = 99
        data[i + 2] = 235
      }
    }
  }
  return sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer()
}

const student = await stackVertical([
  await contentPane(join(srcDir, 'Screenshot 2026-07-11 204433.png'), { trimBottom: 8 }),
  await contentPane(join(srcDir, 'Screenshot 2026-07-11 204446.png'), { trimTop: 210, trimBottom: 150 }),
  await contentPane(join(srcDir, 'Screenshot 2026-07-11 204505.png'), { trimTop: 95 }),
])
await student.toFile(join(destDir, 'student-dashboard.png'))

const adminStats = await contentPane(join(srcDir, 'Screenshot 2026-07-11 201808.png'), { trimBottom: 24 })
const summaryCards = await splitPageCards(
  await contentPane(join(srcDir, 'Screenshot 2026-07-11 201845.png'), { trimBottom: 8 }),
)
const riskCards = await splitPageCards(
  await contentPane(join(srcDir, 'Screenshot 2026-07-11 201912.png'), { trimBottom: 150 }),
)
const adminWidth = (await sharp(adminStats).metadata()).width
const actionCards = await splitPageCards(
  await contentPane(join(srcDir, 'Screenshot 2026-07-11 201925.png'), { trimTop: 8 }),
)
const chartColumn = await unifyEqualStack(
  [summaryCards[0], summaryCards[1], riskCards[0], ...actionCards].filter(Boolean),
  adminWidth,
)
const admin = await stackVertical([adminStats, chartColumn])
await admin.toFile(join(destDir, 'dashboard.png'))

const loginBox = await loginCrop(join(srcDir, 'Screenshot 2026-07-11 204315.png'))
await sharp(join(srcDir, 'Screenshot 2026-07-11 204315.png'))
  .extract(loginBox)
  .png()
  .toFile(join(destDir, 'login.png'))

const withSidebar = [
  ['Screenshot 2026-07-11 201744.png', 'course-management.png'],
  ['Screenshot 2026-07-11 204230.png', 'faculty.png'],
  ['Screenshot 2026-07-11 204124.png', 'departments.png'],
  ['Screenshot 2026-07-11 204520.png', 'students.png'],
]

for (const [from, to] of withSidebar) {
  const buf = await contentPane(join(srcDir, from), { dropSidebar: false })
  await sharp(buf).png().toFile(join(destDir, to))
}

const grades = await recolorBlackHeader(gradeSrc)
await sharp(grades).png().toFile(join(destDir, 'grades.png'))

const ogSvg = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0D0D0D"/>
  <rect x="0" y="0" width="8" height="630" fill="#E8622C"/>
  <text x="88" y="300" fill="#F4F1EA" font-size="64" font-family="Georgia, serif">Ufaq Khalid</text>
  <text x="88" y="360" fill="#C4B8A5" font-size="28" font-family="Arial, sans-serif">Database systems, specification, applied DSA</text>
</svg>
`)
await sharp(ogSvg).png().toFile(join(process.cwd(), 'public', 'og.png'))

console.log('wrote stacked dashboards, login, sidebar-complete modules, and grade table')
