import path from 'node:path'
import fs from 'node:fs'
import ac from 'ansi-colors'
import chokidar from 'chokidar'
import { build, context } from 'esbuild'
import postcss from 'esbuild-postcss'

const onProduction = process.env.NODE_ENV === 'production'
const srcPath = './zrc'
const outputDestination = './assets'

/* ============================================= */
// Utils
/* ============================================= */

async function updateBuilder () {
  const newEntryPoints = await getIndexFiles(srcPath)
  bundleConfig.entryPoints = newEntryPoints
  bundle = await context(bundleConfig)
}

async function getIndexFiles (dir) {
  const files = await fs.readdirSync(dir)
  const indexes = []

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = await fs.statSync(filePath)

    if (stats.isDirectory()) {
      const innerIndexes = await getIndexFiles(filePath)
      indexes.push(...innerIndexes)
    } else if (file.includes('index')) {
      const componentsPrefix = dir.includes('components') ? 'component-' : ''
      const templatesPrefix = dir.includes('templates') ? 'template-' : ''
      const sectionsPrefix = dir.includes('sections') ? 'section-' : ''
      const layoutPrefix = dir.includes('layout') ? 'layout-' : ''
      const folderName = path.basename(dir)
      indexes.push({
        out: layoutPrefix + sectionsPrefix + templatesPrefix + componentsPrefix + folderName,
        in: filePath
      })
    }
  }

  return indexes
}

/* ============================================= */
// Configuracion
/* ============================================= */

const watcher = chokidar.watch(srcPath)
const filesEntries = await getIndexFiles(srcPath)
const bundleConfig = {
  entryPoints: filesEntries,
  bundle: true,
  format: 'esm',
  minify: onProduction,
  outdir: outputDestination,
  plugins: [postcss()],
  alias: {
    Components: './zrc/scripts/components'
  },
  external: ['*.svg', '*.webp', '*.png']
}
let bundle = await context(bundleConfig)

// Building inicial
build(bundleConfig)
  .then(() => {
    console.log(ac.green.bold('Build inicial terminado'))
  })
  .catch((error) => {
    console.log(error)
  })

if (!onProduction) {
  // Observador listo
  watcher.on('ready', () => {
    console.log(ac.magenta.bold(`Observando cambios en: ${ac.white(srcPath)}`))
  })

  // Observar los cambios de los archivos y folders
  watcher
    .on('add', updateBuilder)
    .on('addDir', updateBuilder)
    .on('unlink', updateBuilder)
    .on('unlinkDir', updateBuilder)
    .on('change', async (path) => {
      console.log(ac.white.bold('==============================================================='))
      console.log(ac.cyan.bold(`*   Archivo Modificado: ${ac.white(path)}`))

      bundle
        .rebuild()
        .then(() => {
          console.log(ac.green.bold('*   Bundle regenerado'))
        })
        .catch((error) => {
          console.log(error)
        })
    })
}
