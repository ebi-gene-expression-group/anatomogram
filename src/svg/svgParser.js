const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const svgFiles =
  fs.readdirSync(path.resolve(__dirname))
    .filter((file) => path.extname(file) === `.svg`)
    .map((file) => path.resolve(__dirname, file))
const jsonFiles = []

const parser = new xml2js.Parser()

svgFiles.forEach((svgFile) => {
  process.stdout.write(`\nProcessing ${svgFile}... `)

  const svgFileContents = fs.readFileSync(svgFile)

  parser.reset()
  parser.parseString(svgFileContents, (err, result) => {
    const size = {
      width: parseFloat(result.svg.$.width),
      height: parseFloat(result.svg.$.height)
    }

    const efoLayerGroup = result.svg.g.find((g) => g.$.id === `LAYER_EFO`)
    const shapeTypes = Object.keys(efoLayerGroup).filter((xmlTag) => xmlTag !== `$`)

    const ids =
      shapeTypes
        .reduce((acc, shapeType) => {
          // process.stdout.write(`${shapeType}: ${efoLayerGroup[shapeType].length}\n`)
          return acc.concat(efoLayerGroup[shapeType].map((shape) => shape.$.id ? shape.$.id : ``))
        }, [])
        .filter(e => e !== ``)

    const metadata = {
      filename: path.basename(svgFile),
      size,
      ids
    }
    process.stdout.write(`finished: ${ids.length} IDs found\n`)

    const outputFile = path.resolve(__dirname, `${path.basename(svgFile, `.svg`)}.json`)
    process.stdout.write(`Writing SVG metadata to ${outputFile}... `)
    fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2))
    process.stdout.write(`done\n`)
    jsonFiles.push(metadata)
  })
})

fs.writeFileSync(path.resolve(__dirname, `all.json`), JSON.stringify(jsonFiles, null, 2))
