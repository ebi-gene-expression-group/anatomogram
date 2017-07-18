const fs = require('fs')
const path = require('path')
const fastXmlParser = require('fast-xml-parser')

const parseSvg = (svgData) => {
  if(fastXmlParser.validate(svgData) === true) {
    const attrPrefix = `@_` // fast-xml-parser default, can be changed
    const svgObj = fastXmlParser.parse(svgData, {ignoreNonTextNodeAttr : false}).svg

    const metadata = {}
    const metadataAttributes = [`width`, `height`]
    metadataAttributes.forEach((attr) => metadata[attr] = svgObj[`${attrPrefix}${attr}`])

    const efoLayerGroup = svgObj.g.find((g) => g[`${attrPrefix}id`] === `LAYER_EFO`)
    const shapeTypes =
      efoLayerGroup ? Object.keys(efoLayerGroup).filter((xmlTag) => !xmlTag.startsWith(attrPrefix)) : []

    metadata.ids =
      shapeTypes.reduce((acc, shapeType) => {
        const shapes = Array.isArray(efoLayerGroup[shapeType]) ? efoLayerGroup[shapeType] : [efoLayerGroup[shapeType]]
        return acc.concat(shapes.map((shape) => shape[`${attrPrefix}id`]))
      }, [])

    return metadata
  }
  else {
    process.stderr.write(`Error: invalid XML input\n`)
  }
}



if (process.argv.length < 3) {
  process.stdout.write(`svgMetadataParser: no input files\n\n`)
  process.stdout.write(`usage: node svgMetadataParser.js <source> [destination]\n\n`)
  process.stdout.write(`Source can be a SVG file or a directory containing one or more SVG files.\n`)
  process.stdout.write(`If source is set to "-" input is read from stdin.\n`)
  process.exit(1)
}

const outStream = process.argv[3] ? fs.createWriteStream(process.argv[3]) : process.stdout

const parseSvgFile = (filename) => ({
  [filename]: parseSvg(fs.readFileSync(filename, {encoding: `utf8`}))
})


if (process.argv[2] === `-`) {
  const chunks = []
  process.stdin.on(`data`, (chunk) => { chunks.push(chunk) })
  process.stdin.on(`end`, () => {
    outStream.write(JSON.stringify(parseSvg(Buffer.concat(chunks).toString()), null, 2))
  })
}
else {
  const inPathStats = fs.lstatSync(process.argv[2])

  if (inPathStats.isFile()) {
     outStream.write(JSON.stringify(parseSvgFile(process.argv[2]), null, 2))

  } else if (inPathStats.isDirectory()) {
    outStream.write(
      JSON.stringify(
        fs.readdirSync(process.argv[2])
          .filter((filename) => path.extname(filename) === `.svg`)
          .map((filename) => {
            process.stdout.write(`Processing ${filename}...`)
            const parsed = parseSvgFile(filename)
            process.stdout.write(` done\n`)
            return parsed
          }),
        null, 2
    ))

  } else {
    process.stderr.write(`Invalid input file`)
    process.exit(1)
  }
}
