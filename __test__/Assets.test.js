import {getAnatomogramViews} from '../src/Assets'
import fs from 'fs'
import path from 'path'

const unique = (value, index, self) => self.indexOf(value) === index

describe(`Assets`, () => {

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

})
