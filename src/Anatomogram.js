import React from 'react'
import PropTypes from 'prop-types'

import tx from 'transform-props-with'

import Switcher from './Switcher'
import AnatomogramSvg from './AnatomogramSvg'
import {getDefaultView, supportedSpecies} from './Assets'


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

class Anatomogram extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedView: getDefaultView(props.species)
    }
    this._switchAnatomogramView = this._switchAnatomogramView.bind(this)
  }

  _switchAnatomogramView(anatomogramView) {
    this.setState({ selectedView: anatomogramView })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.species !== this.props.species) {
      this.setState({ selectedView: getDefaultView(nextProps.species) })
    }
  }

  render() {
    return (
      supportedSpecies.includes(this.props.species) &&
        <div>
          <Switcher
            species={this.props.species}
            selectedView={this.state.selectedView}
            onChangeView={this._switchAnatomogramView} />

          <AnatomogramSvg
            {...this.props}
            idsWithMarkup={idsWithMarkupAccordingToCurrentColoringScheme(this.props)}
            selectedView={this.state.selectedView} />
        </div>
    )
  }
}

Anatomogram.propTypes = {
  species: PropTypes.string.isRequired,

  showIds: PropTypes.arrayOf(PropTypes.string),
  highlightIds: PropTypes.arrayOf(PropTypes.string),
  selectIds: PropTypes.arrayOf(PropTypes.string),

  showColour: PropTypes.string,
  highlightColour: PropTypes.string,
  selectColour: PropTypes.string,

  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onClick: PropTypes.func
}

Anatomogram.defaultProps = {
  showIds: [],
  highlightIds: [],
  selectIds: [],

  showColour: `grey`,
  highlightColour: `red`,
  selectColour: `purple`,

  showOpacity: 0.4,
  highlightOpacity: 0.4,
  selectOpacity: 0.4,

  onMouseOver: () => {},
  onMouseOut: () => {},
  onClick: () => {}
}

const normaliseSpecies = (oldProps) => {
  const { species, ...props } = oldProps

  return {
    species: species.toLowerCase().replace(/ +/, `_`),
    ...props
  }
}

export default tx(normaliseSpecies)(Anatomogram)
