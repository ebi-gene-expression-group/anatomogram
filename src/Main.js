import {isEqual,negate} from 'lodash'

import {compose, withPropsOnChange, defaultProps, mapProps, onlyUpdateForPropTypes, setPropTypes} from 'recompose'

import Anatomogram from './Anatomogram'
import PropTypes from 'prop-types'


const arrayDifference = (arr1, arr2) =>
  Array.isArray(arr1) && Array.isArray(arr2) ? arr1.filter((e) => !arr2.includes(e)) : arr1

const elementMarkup = (colour, opacity) => ({fill: colour, opacity: opacity})

const idsWithMarkupAccordingToCurrentColoringScheme = ({
  showIds,
  showColour,
  showOpacity,
  highlightIds,
  highlightColour,
  highlightOpacity,
  selectIds,
  selectColour,
  selectOpacity}) => {
  const uniqueShowIds = arrayDifference(showIds, [...highlightIds, ...selectIds])
  const uniqueHighlightIds = arrayDifference(highlightIds, selectIds)


  //Given an element and its ids, we take the first element of this array having one of the ids
  return [].concat(
    selectIds.map(id => ({
      id,
      markupNormal: elementMarkup(selectColour, selectOpacity),
      markupUnderFocus: elementMarkup(selectColour, selectOpacity+0.2)
    })),
    uniqueHighlightIds.map(id => ({
      id,
      markupNormal: elementMarkup(highlightColour, highlightOpacity),
      markupUnderFocus: elementMarkup(highlightColour, highlightOpacity+0.2)
    })),
    uniqueShowIds.map(id => ({
      id,
      markupNormal: elementMarkup(showColour, showOpacity),
      markupUnderFocus: elementMarkup(highlightColour, highlightOpacity+0.2)
    })),
  )
}

const addColoringScheme  = compose(
  defaultProps({
    showIds: [],
    highlightIds: [],
    selectIds: [],
    showColour: `grey`,
    highlightColour: `red`,
    selectColour: `purple`,
    showOpacity: 0.4,
    highlightOpacity: 0.4,
    selectOpacity: 0.4}),
  withPropsOnChange(negate(isEqual),
    props => ({idsWithMarkup: idsWithMarkupAccordingToCurrentColoringScheme(props)})
  )
)

const normaliseSpecies = mapProps(
  props => Object.assign({}, props, {species: props.species.toLowerCase().replace(/ +/, `_`)})
)

const addDefaultCallbacks = defaultProps({
  onMouseOver: () => {},
  onMouseOut: () => {},
  onClick: () => {}
})

const definePropTypes = setPropTypes({
  atlasUrl: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  idsWithMarkup: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    markupNormal: PropTypes.object.isRequired,
    markupUnderFocus: PropTypes.object.isRequired
  })).isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
})

const defineDefaultProps = defaultProps({
  atlasUrl: `https://www.ebi.ac.uk/gxa/`
})

export default compose(addColoringScheme, onlyUpdateForPropTypes, definePropTypes, defineDefaultProps, addDefaultCallbacks, normaliseSpecies)(Anatomogram)
