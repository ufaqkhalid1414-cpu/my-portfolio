import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const md = readFileSync(join(root, 'PRD.md'), 'utf8')

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

function render(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const out = []
  let i = 0
  let inList = false
  let inQuote = false

  const closeList = () => {
    if (inList) {
      out.push('</ul>')
      inList = false
    }
  }
  const closeQuote = () => {
    if (inQuote) {
      out.push('</blockquote>')
      inQuote = false
    }
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('|') && i + 1 < lines.length && /^\|[\s:-|]+\|$/.test(lines[i + 1])) {
      closeList()
      closeQuote()
      const rows = []
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i])
        i += 1
      }
      const parseRow = (row) =>
        row
          .split('|')
          .slice(1, -1)
          .map((c) => inline(c.trim()))
      const header = parseRow(rows[0])
      const body = rows.slice(2).map(parseRow)
      out.push('<table><thead><tr>' + header.map((c) => `<th>${c}</th>`).join('') + '</tr></thead><tbody>')
      for (const row of body) {
        out.push('<tr>' + row.map((c) => `<td>${c}</td>`).join('') + '</tr>')
      }
      out.push('</tbody></table>')
      continue
    }

    if (line.startsWith('# ')) {
      closeList()
      closeQuote()
      out.push(`<h1>${inline(line.slice(2))}</h1>`)
    } else if (line.startsWith('## ')) {
      closeList()
      closeQuote()
      out.push(`<h2>${inline(line.slice(3))}</h2>`)
    } else if (line.startsWith('### ')) {
      closeList()
      closeQuote()
      out.push(`<h3>${inline(line.slice(4))}</h3>`)
    } else if (line.startsWith('#### ')) {
      closeList()
      closeQuote()
      out.push(`<h4>${inline(line.slice(5))}</h4>`)
    } else if (line === '---') {
      closeList()
      closeQuote()
      out.push('<hr />')
    } else if (line.startsWith('- ')) {
      closeQuote()
      if (!inList) {
        out.push('<ul>')
        inList = true
      }
      out.push(`<li>${inline(line.slice(2))}</li>`)
    } else if (line.startsWith('> ')) {
      closeList()
      if (!inQuote) {
        out.push('<blockquote>')
        inQuote = true
      }
      out.push(`<p>${inline(line.slice(2))}</p>`)
    } else if (line.trim() === '') {
      closeList()
      closeQuote()
    } else {
      closeList()
      closeQuote()
      out.push(`<p>${inline(line)}</p>`)
    }
    i += 1
  }
  closeList()
  closeQuote()
  return out.join('\n')
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>PRD — Ufaq Khalid Portfolio</title>
  <style>
    @page { margin: 18mm 16mm; }
    body {
      font-family: "Segoe UI", system-ui, sans-serif;
      color: #1a1d24;
      line-height: 1.55;
      font-size: 11.5pt;
      max-width: 820px;
      margin: 0 auto;
    }
    h1 { font-size: 22pt; margin: 0 0 12pt; }
    h2 { font-size: 15pt; margin: 22pt 0 8pt; border-bottom: 1px solid #d8dce3; padding-bottom: 4pt; }
    h3 { font-size: 12.5pt; margin: 16pt 0 6pt; }
    h4 { font-size: 11.5pt; margin: 12pt 0 4pt; }
    p { margin: 0 0 8pt; }
    ul { margin: 0 0 10pt; padding-left: 18pt; }
    li { margin: 0 0 3pt; }
    hr { border: none; border-top: 1px solid #d8dce3; margin: 16pt 0; }
    code { font-family: Consolas, "Courier New", monospace; font-size: 0.92em; background: #f3f4f7; padding: 0 4px; }
    a { color: #2457c5; }
    table { border-collapse: collapse; width: 100%; margin: 0 0 14pt; font-size: 10.5pt; }
    th, td { border: 1px solid #cfd4dc; padding: 6px 8px; text-align: left; vertical-align: top; }
    th { background: #eef1f6; }
    blockquote { margin: 0 0 12pt; padding: 8pt 12pt; background: #f6f7fa; border-left: 3px solid #6b9eff; }
  </style>
</head>
<body>
${render(md)}
</body>
</html>
`

mkdirSync(join(root, 'public'), { recursive: true })
writeFileSync(join(root, 'public', 'prd.html'), html)
console.log('Wrote public/prd.html')
