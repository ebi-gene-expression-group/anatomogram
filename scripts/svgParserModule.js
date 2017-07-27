const fs = require('fs')
const fastXmlParser = require('fast-xml-parser')

module.exports = (svgData) => {
  if (fastXmlParser.validate(svgData) === false) {
    throw new Error(`Invalid XML input\n`)
  }

  // fast-xml-parser default, can be changed
  const attrPrefix = `@_`
  // fast-xml-parser considers self closing tags to be text nodes:
  // https://github.com/NaturalIntelligence/fast-xml-parser/issues/18
  const svgObj =
    fastXmlParser.parse(
      svgData,
      {ignoreTextNodeAttr: false, ignoreNonTextNodeAttr: false, textAttrConversion: true}
    ).svg

  const metadata = {}
  const metadataAttributes = [`width`, `height`]
  metadataAttributes.forEach((attr) => {
    if (!svgObj[`${attrPrefix}${attr}`]) {
      throw new Error(`Missing required attribute: ${attr}`)
    }
    metadata[attr] = svgObj[`${attrPrefix}${attr}`]
  })

  const layers = svgObj.g ?
    Array.isArray(svgObj.g) ? svgObj.g : [svgObj.g] :
    []

  if (!layers.some((g) => g[`${attrPrefix}id`] === `LAYER_EFO`)) {
    metadata.ids = []
  } else {
    const efoLayerGroup = layers.find((g) => g[`${attrPrefix}id`] === `LAYER_EFO`)
    // Alternatively we can declare shapeTypes explicitly: const shapeTypes = [`g`, `path`, `ellipse`, `rect`...]
    const shapeTypes = Object.keys(efoLayerGroup).filter((node) => !node.startsWith(attrPrefix) && node !== `#text`)

    metadata.ids =
      shapeTypes.reduce((acc, shapeType) => {
        const shapes = Array.isArray(efoLayerGroup[shapeType]) ? efoLayerGroup[shapeType] : [efoLayerGroup[shapeType]]
        return acc.concat(shapes.map((shape) => shape[`${attrPrefix}id`]))
      }, [])
  }

  return metadata
}
