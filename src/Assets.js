import svgsMetadata from './json/svgsMetadata.json'

const unique = (value, index, self) => self.indexOf(value) === index
const isNotBlank = (str) => typeof str === `string` && str !== ``

const supportedSpecies =
  svgsMetadata
    .map((svgMetadata) => svgMetadata.species)
    .filter(unique)

const multipleViewsSpecies =
  svgsMetadata
		.filter((svgMetadata) => svgMetadata.view !== ``)
    .map((svgMetadata) => svgMetadata.species)
    .filter(unique)

const anatomogramViews =
  multipleViewsSpecies
    .reduce((acc, species) => {
      acc[species] =
				svgsMetadata
					.filter((svgMetadata) => svgMetadata.species === species)
					.map((svgMetadata) => svgMetadata.view)
					.filter(isNotBlank)
					.sort()
					.reverse()	// The order we want is `male`, `female`, `brain` and `whole_plant`, `flower_parts` :)
      return acc
    }, {})

const getAnatomogramViews = (species) => {
  return anatomogramViews[species] || []
}

const getDefaultView = (species) => getAnatomogramViews(species)[0]

export {getAnatomogramViews, getDefaultView, supportedSpecies}
