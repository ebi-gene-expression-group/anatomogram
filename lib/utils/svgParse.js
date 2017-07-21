'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');
var path = require('path');
var parseSvg = require('./svgParserModule.js');

var parseSvgFile = function parseSvgFile(filename) {
  return _defineProperty({}, path.basename(filename), parseSvg(fs.readFileSync(filename, { encoding: 'utf8' })));
};

if (process.argv.length < 3) {
  process.stdout.write('svgMetadataParser: no input files\n\n');
  process.stdout.write('usage: node svgMetadataParser.js <source> [destination]\n\n');
  process.stdout.write('Source can be a SVG file or a directory containing one or more SVG files.\n');
  process.stdout.write('If source is set to "-" input is read from stdin.\n');
  process.exit(1);
}

var outStream = process.argv[3] ? fs.createWriteStream(process.argv[3]) : process.stdout;

if (process.argv[2] === '-') {
  var chunks = [];
  process.stdin.on('data', function (chunk) {
    chunks.push(chunk);
  });
  process.stdin.on('end', function () {
    outStream.write(JSON.stringify(parseSvg(Buffer.concat(chunks).toString()), null, 2));
  });
} else {
  var inPathStats = fs.lstatSync(process.argv[2]);

  if (inPathStats.isFile()) {
    outStream.write(JSON.stringify(parseSvgFile(process.argv[2]), null, 2));
  } else if (inPathStats.isDirectory()) {
    outStream.write(JSON.stringify(fs.readdirSync(process.argv[2]).filter(function (filename) {
      return path.extname(filename) === '.svg';
    }).map(function (filename) {
      return path.resolve(process.argv[2], filename);
    }).reduce(function (acc, pathToFile) {
      process.stdout.write('Processing ' + pathToFile + '...');
      var parsed = parseSvgFile(pathToFile);
      process.stdout.write(' done\n');
      return Object.assign(acc, parsed);
    }, {}), null, 2));
  } else {
    process.stderr.write('Invalid input file');
    process.exit(1);
  }
}