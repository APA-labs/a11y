import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

import { chromium } from '@playwright/test'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.resolve(__dirname, '../public/previews')

const WIDTH = 498
const HEIGHT = 398
const SCALE = 2

const ROBOTO_CSS = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'

function baseHTML(bodyScript) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <link rel="stylesheet" href="${ROBOTO_CSS}"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fafafa;
      font-family: 'Roboto', sans-serif;
      overflow: hidden;
    }
    #root {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 24px;
    }
  </style>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@mui/material@5/umd/material-ui.production.min.js" crossorigin></script>
</head>
<body>
  <div id="root"></div>
  <script>
    const e = React.createElement;
    const {
      Alert, AlertTitle, Stack,
      Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
      Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
      Snackbar, IconButton, Typography
    } = MaterialUI;

    ${bodyScript}
  </script>
</body>
</html>`
}

const components = {
  alert: {
    slug: 'alert',
    script: `
      function App() {
        return e(Stack, { spacing: 1.5, sx: { width: '100%', maxWidth: 420 } },
          e(Alert, { severity: 'error' }, e(AlertTitle, null, 'Error'), 'This is an error alert.'),
          e(Alert, { severity: 'warning' }, e(AlertTitle, null, 'Warning'), 'This is a warning alert.'),
          e(Alert, { severity: 'info' }, e(AlertTitle, null, 'Info'), 'This is an info alert.'),
          e(Alert, { severity: 'success' }, e(AlertTitle, null, 'Success'), 'This is a success alert.')
        );
      }
      ReactDOM.createRoot(document.getElementById('root')).render(e(App));
    `
  },
  'alert-dialog': {
    slug: 'alert-dialog',
    script: `
      function App() {
        return e('div', { style: { position: 'relative', width: '100%', maxWidth: 400 } },
          e(Paper, { elevation: 8, sx: { borderRadius: 2, overflow: 'hidden' } },
            e(DialogTitle, null, 'Discard changes?'),
            e(DialogContent, null,
              e(DialogContentText, null, 'Your unsaved changes will be lost. This action cannot be undone.')
            ),
            e(DialogActions, { sx: { px: 3, pb: 2 } },
              e(Button, { variant: 'text' }, 'Cancel'),
              e(Button, { variant: 'contained', color: 'error' }, 'Discard')
            )
          )
        );
      }
      ReactDOM.createRoot(document.getElementById('root')).render(e(App));
    `
  },
  table: {
    slug: 'table',
    script: `
      const rows = [
        { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
        { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
        { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
        { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
      ];
      function App() {
        return e(TableContainer, { component: Paper, sx: { maxWidth: 440 } },
          e(Table, { size: 'small', 'aria-label': 'nutrition table' },
            e(TableHead, null,
              e(TableRow, null,
                e(TableCell, null, 'Dessert'),
                e(TableCell, { align: 'right' }, 'Calories'),
                e(TableCell, { align: 'right' }, 'Fat (g)'),
                e(TableCell, { align: 'right' }, 'Carbs (g)'),
                e(TableCell, { align: 'right' }, 'Protein (g)')
              )
            ),
            e(TableBody, null,
              ...rows.map(row =>
                e(TableRow, { key: row.name },
                  e(TableCell, { component: 'th', scope: 'row' }, row.name),
                  e(TableCell, { align: 'right' }, row.calories),
                  e(TableCell, { align: 'right' }, row.fat),
                  e(TableCell, { align: 'right' }, row.carbs),
                  e(TableCell, { align: 'right' }, row.protein)
                )
              )
            )
          )
        );
      }
      ReactDOM.createRoot(document.getElementById('root')).render(e(App));
    `
  },
  toast: {
    slug: 'toast',
    script: `
      function App() {
        return e(Stack, { spacing: 1.5, sx: { width: '100%', maxWidth: 420 } },
          e(Alert, { severity: 'success', variant: 'filled', sx: { boxShadow: 3 } },
            'File uploaded successfully!'
          ),
          e(Alert, { severity: 'info', variant: 'filled', sx: { boxShadow: 3 } },
            'Processing your request…'
          ),
          e(Alert, { severity: 'warning', variant: 'filled', sx: { boxShadow: 3 } },
            'Session expires in 5 minutes.'
          )
        );
      }
      ReactDOM.createRoot(document.getElementById('root')).render(e(App));
    `
  }
}

async function main() {
  const targets = process.argv.slice(2)
  const entries = targets.length ? Object.entries(components).filter(([k]) => targets.includes(k)) : Object.entries(components)

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE
  })

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'a11y-previews-'))

  for (const [name, { slug, script }] of entries) {
    const page = await context.newPage()
    const html = baseHTML(script)

    const tmpFile = path.join(tmpDir, `${slug}.html`)
    fs.writeFileSync(tmpFile, html)
    await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    const outputPath = path.join(OUTPUT_DIR, `${slug}.png`)
    await page.screenshot({ path: outputPath, fullPage: false })
    console.log(`✓ ${slug}.png (${WIDTH * SCALE}x${HEIGHT * SCALE})`)
    await page.close()
  }

  fs.rmSync(tmpDir, { recursive: true })
  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
