import svgsMetadata from './json/svgsMetadata.json'

const unique = (value, index, self) => self.indexOf(value) === index
const isNotBlank = (str) => typeof str === `string` && str !== ``

const anatomogramViews =
  svgsMetadata
    .map((svgMetadata) => svgMetadata.species)
    .filter(unique)
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
  const canonicalSpecies = typeof species === `string` ? species.trim().toLowerCase().replace(/ +/, `_`) : ``
  return anatomogramViews[canonicalSpecies] || []
}

const getDefaultView = (species) => getAnatomogramViews(species)[0]

export {getAnatomogramViews, getDefaultView}