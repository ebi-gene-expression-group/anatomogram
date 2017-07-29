const fs = require('fs')
const path = require('path')
const parseSvg = require('./svgParserModule.js')

if (process.argv.length < 3) {
  process.stdout.write(`svgParse: no input files\n\n`)
  process.stdout.write(`usage: node svgMetadataParser.js <source> \n\n`)
  process.stdout.write(`Source can be a SVG file or a directory containing one or more SVG files.\n`)
  process.stdout.write(`If source is set to "-" input is read from stdin.\n`)
  process.exit(1)
}

const parseSvgFile = (filename) => {
  const [species, type] = path.basename(filename, `.svg`).split(`.`)
  const speciesAttributes = {
    species: species,
    type: type ? type : ``
  }
  return {
    [path.basename(filename)]:
      Object.assign(speciesAttributes, parseSvg(fs.readFileSync(filename, {encoding: `utf8`})))
  }
}

if (process.argv[2] === `-`) {
  const chunks = []
  process.stdin.on(`data`, (chunk) => { chunks.push(chunk) })
  process.stdin.on(`end`, () => {
    process.stdout.write(JSON.stringify(parseSvg(Buffer.concat(chunks).toString()), null, 2))
  })
}
else {
  const inPathStats = fs.lstatSync(process.argv[2])

  if (inPathStats.isFile()) {
     process.stdout.write(JSON.stringify(parseSvgFile(process.argv[2]), null, 2))

  } else if (inPathStats.isDirectory()) {
    process.stdout.write(
      JSON.stringify(
        fs.readdirSync(process.argv[2])
          .filter((filename) => path.extname(filename) === `.svg`)
          .map((filename) => path.resolve(process.argv[2], filename))
          .reduce((acc, pathToFile) => {
            const parsed = parseSvgFile(pathToFile)
            return Object.assign(acc, parsed)
          }, {}),
        null, 2))

  } else {
    process.stderr.write(`Invalid input file`)
    process.exit(1)
  }
}
