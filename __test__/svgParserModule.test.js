import parseSvg from '../scripts/svgParserModule'

describe(`SVG parser`, () => {

  test(`throws an error if XML is invalid`, () => {
    const svgData =
      `<svg width="500" height="500">` +
        `<g id="LAYER_EFO">` +
          `<g id="UBERON_00000948">` +
            `<path />` +
            `<path />` +
          `</g>` +
      `</svg>`

    expect(() => { parseSvg(svgData) }).toThrow(Error)
  })

  test(`throws an error when height and/or width are missing`, () => {
    const svgData = `<svg></svg>`
    const svgDataNoHeight = `<svg width="500"></svg>`
    const svgDataNoWidth = `<svg height="500"></svg>`

    expect(() => { parseSvg(svgData) }).toThrow(Error)
    expect(() => { parseSvg(svgDataNoHeight) }).toThrow(Error)
    expect(() => { parseSvg(svgDataNoWidth) }).toThrow(Error)
  })

  test(`parses minimal SVGs correctly`, () => {
    const svgData = `<svg width="500" height="500"></svg>`

    const expected = {
      width: 500,
      height: 500,
      ids: []
    }

    expect(parseSvg(svgData)).toEqual(expected)
  })

  test(`parses minimal SVGs correctly`, () => {
    const svgData = `<svg width="500" height="500"></svg>`

    const expected = {
      width: 500,
      height: 500,
      ids: []
    }

    expect(parseSvg(svgData)).toEqual(expected)
  })


  test(`only parses IDs in the EFO layer`, () => {
    const svgData =
      `<svg width="500" height="500">` +
        `<g id="LAYER_OUTLINE">` +
          `<path id="UBERON_00000955" />` +
        `</g>` +
        `<g id="LAYER_EFO">` +
          `<path id="UBERON_00000948" />` +
        `</g>` +
      `</svg>`

    const expected = {
      width: 500,
      height: 500,
      ids: [`UBERON_00000948`]
    }

    expect(parseSvg(svgData)).toEqual(expected)
  })

  test(`only parses top-level IDs in the EFO layer`, () => {
    const svgData =
      `<svg width="500" height="500">` +
        `<g id="LAYER_EFO">` +
          `<g id="UBERON_00000948">` +
            `<path id="foobar" />` +
          `</g>` +
        `</g>` +
      `</svg>`

    const expected = {
      width: 500,
      height: 500,
      ids: [`UBERON_00000948`]
    }

    expect(parseSvg(svgData)).toEqual(expected)
  })

  test(`parses any top-level node ID in the EFO layer`, () => {
    const svgData =
      `<svg width="500" height="500">` +
        `<g id="LAYER_EFO">` +
          `<g id="UBERON_00000948">` +
            `<path />` +
            `<path />` +
          `</g>` +
          `<path id="UBERON_00000955" />` +
          `<path id="UBERON_00002107" />` +
          `<ellipse id="UBERON_00002113" />` +
          `<foobar id="UBERON_0014892" />` +
        `</g>` +
      `</svg>`

    const expected = {
      width: 500,
      height: 500,
      ids: [`UBERON_00000948`, `UBERON_00000955`, `UBERON_00002107`, `UBERON_00002113`, `UBERON_0014892`]
    }

    expect(parseSvg(svgData)).toEqual(expected)
  })

})
