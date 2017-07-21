'use strict';

var fs = require('fs');
var fastXmlParser = require('fast-xml-parser');

module.exports = function (svgData) {
  if (fastXmlParser.validate(svgData) === false) {
    throw new Error('Invalid XML input\n');
  }

  // fast-xml-parser default, can be changed
  var attrPrefix = '@_';
  // fast-xml-parser considers self closing tags to be text nodes:
  // https://github.com/NaturalIntelligence/fast-xml-parser/issues/18
  var svgObj = fastXmlParser.parse(svgData, { ignoreTextNodeAttr: false, ignoreNonTextNodeAttr: false, textAttrConversion: true }).svg;

  var metadata = {};
  var metadataAttributes = ['width', 'height'];
  metadataAttributes.forEach(function (attr) {
    if (!svgObj['' + attrPrefix + attr]) {
      throw new Error('Missing required attribute: ' + attr);
    }
    metadata[attr] = svgObj['' + attrPrefix + attr];
  });

  var layers = svgObj.g ? Array.isArray(svgObj.g) ? svgObj.g : [svgObj.g] : [];

  if (!layers.some(function (g) {
    return g[attrPrefix + 'id'] === 'LAYER_EFO';
  })) {
    metadata.ids = [];
  } else {
    var efoLayerGroup = layers.find(function (g) {
      return g[attrPrefix + 'id'] === 'LAYER_EFO';
    });
    // Alternatively we can declare shapeTypes explicitly: const shapeTypes = [`g`, `path`, `ellipse`, `rect`...]
    var shapeTypes = Object.keys(efoLayerGroup).filter(function (node) {
      return !node.startsWith(attrPrefix) && node !== '#text';
    });

    metadata.ids = shapeTypes.reduce(function (acc, shapeType) {
      var shapes = Array.isArray(efoLayerGroup[shapeType]) ? efoLayerGroup[shapeType] : [efoLayerGroup[shapeType]];
      return acc.concat(shapes.map(function (shape) {
        return shape[attrPrefix + 'id'];
      }));
    }, []);
  }

  return metadata;
};