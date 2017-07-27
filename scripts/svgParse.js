const fs = require('fs')
const path = require('path')
const parseSvg = require('./svgParserModule.js')

const parseSvgFile = (filename) => ({
  [path.basename(filename)]: parseSvg(fs.readFileSync(filename, {encoding: `utf8`}))
})

if (process.argv.length < 3) {
  process.stdout.write(`svgMetadataParser: no input files\n\n`)
  process.stdout.write(`usage: node svgMetadataParser.js <source> [destination]\n\n`)
  process.stdout.write(`Source can be a SVG file or a directory containing one or more SVG files.\n`)
  process.stdout.write(`If source is set to "-" input is read from stdin.\n`)
  process.exit(1)
}

const outStream = process.argv[3] ? fs.createWriteStream(process.argv[3]) : process.stdout

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
          .map((filename) => path.resolve(process.argv[2], filename))
          .reduce((acc, pathToFile) => {
            process.stdout.write(`Processing ${pathToFile}...`)
            const parsed = parseSvgFile(pathToFile)
            process.stdout.write(` done\n`)
            return Object.assign(acc, parsed)
          }, {}),
        null, 2))

  } else {
    process.stderr.write(`Invalid input file`)
    process.exit(1)
  }
}
