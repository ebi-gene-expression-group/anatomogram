import { getAnatomogramViews, getDefaultView, supportedSpecies } from '../src/Assets'
import fs from 'fs'
import path from 'path'

const unique = (value, index, self) => self.indexOf(value) === index

describe(`Assets module`, () => {

  const expectedSpecies =
    fs.readdirSync(path.resolve(__dirname, `../src/svg`))
      .filter((filename) => path.extname(filename) === `.svg`)
      .map((filename) => filename.split(`.`)[0])
      .filter(unique)

  const expectedViews =
    fs.readdirSync(path.resolve(__dirname, `../src/svg`))
      .filter((filename) => path.extname(filename) === `.svg`)
      .reduce((acc, svgFilename) => {
        const species = svgFilename.split(`.`)[0]
        const entry = acc[species] || []
        acc[species] =
          entry.concat(svgFilename.split(`.`).length > 2 ? svgFilename.split(`.`)[1] : []).sort().reverse()
        return acc
      }, {})

  expectedSpecies.forEach((species) => {
    test(`contains the right views for ${species}`, () => {
      expect(getAnatomogramViews(species)).toEqual(expectedViews[species])
    })
  })

  test(`default view for human is male`, () => {
    expect(getDefaultView(`homo_sapiens`)).toEqual(`male`)
  })

  test(`default view for single-view species is null`, () => {
    const species = `solanum_tuberosum`
    expect(supportedSpecies.includes(species)).toBe(true)
    expect(getDefaultView(species)).toBe(null)
  })

  test(`default view for unknown species is undefined`, () => {
    expect(getDefaultView(`foobar`)).toBe(undefined)
  })

  test(`anatomogram views for single-view species is an empty array`, () => {
    const species = `solanum_tuberosum`
    expect(supportedSpecies.includes(species)).toBe(true)
    expect(getAnatomogramViews(species)).toEqual([])
  })

  test(`anatomogram views for unknown species is undefined`, () => {
    const species = `foobar`
    expect(supportedSpecies.includes(species)).toBe(false)
    expect(getAnatomogramViews(species)).toBe(undefined)
  })

})
