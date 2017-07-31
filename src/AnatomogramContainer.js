import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import Switcher from './Switcher.js'
import Anatomogram from './Anatomogram.js'
import availableAnatomograms from './json/svgs.json'

const getAvailableAnatomograms = (species) => {
    const canonicalSpecies = (species || "").trim().toLowerCase().replace(/ +/, "_")

    const as = availableAnatomograms[canonicalSpecies]

    return (
        ! as
        ? []
        : ! as.length
            ? [{
                fileName: canonicalSpecies+".svg",
                type: ""
            }]
            : as.map(type => ({
                fileName: canonicalSpecies+type+".svg",
                type
            }))

    )
}

const firstAvailableAnatomogramType = (species) => (
    (getAvailableAnatomograms(species)[0] || {type: ""}).type
)

class AnatomogramContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedAnatomogramType: firstAvailableAnatomogramType(this.props.species)
    }

    this._switchAnatomogramType = this._switchAnatomogramType.bind(this)
  }

  _switchAnatomogramType(anatomogramType) {
    this.setState({
      selectedAnatomogramType: anatomogramType
    })
  }

  // Not strictly necessary but it makes it work with the demo and switch species
  componentWillReceiveProps(nextProps) {
    if (this.props.species !== nextProps.species) {
      this.setState({
        selectedAnatomogramType: firstAvailableAnatomogramType(nextProps.species)
      })
    }
  }

  render() {
    const urlToResources = URI(this.props.pathToResources, this.props.atlasUrl).toString()

    const availableAnatomograms = getAvailableAnatomograms(this.props.species)

    const currentAnatomogram = availableAnatomograms.find(a => a.type === this.state.selectedAnatomogramType)
    return (
        !! currentAnatomogram &&
        <div>
            <Switcher urlToResources={urlToResources}
                      anatomogramTypes={availableAnatomograms.map(a => a.type)}
                      selectedType={currentAnatomogram.type}
                      onChangeSelectedType={this._switchAnatomogramType} />

            <Anatomogram urlToResources={urlToResources}
                         filename={currentAnatomogram.fileName}
                         {...this.props} />
        </div>
    )
  }
}

AnatomogramContainer.propTypes = {
  atlasUrl: PropTypes.string,
  pathToResources: PropTypes.string,
  species: PropTypes.string.isRequired,

  showIds: PropTypes.arrayOf(PropTypes.string),
  highlightIds: PropTypes.arrayOf(PropTypes.string),
  selectIds: PropTypes.arrayOf(PropTypes.string),

  showColour: PropTypes.string,
  highlightColour: PropTypes.string,
  selectColour: PropTypes.string,

  //::List[OntologyId] -> ?
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onClick: PropTypes.func
}

AnatomogramContainer.defaultProps = {
  atlasUrl: ``,
  pathToResources: ``,
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

export default AnatomogramContainer
