import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import Switcher from './Switcher.js'
import Anatomogram from './Anatomogram.js'
import availableAnatomograms from './json/svgs.json'

class AnatomogramContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedAnatomogramType: availableAnatomograms[this.props.species][0] || ``
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
        selectedAnatomogramType: availableAnatomograms[nextProps.species][0] || ``
      })
    }
  }

  render() {
    const svgFilename = this.props.species + this.state.selectedAnatomogramType + `.svg`
    const urlToResources = URI(this.props.pathToResources, this.props.atlasUrl).toString()

    return (
      <div>
        <Switcher urlToResources={urlToResources}
                  anatomogramTypes={availableAnatomograms[this.props.species]}
                  selectedType={this.state.selectedAnatomogramType}
                  onClick={this._switchAnatomogramType}
                  style={{float: `left`}} />

        <Anatomogram urlToResources={urlToResources}
                     filename={svgFilename}
                     showIds={this.props.showIds}
                     highlightIds={this.props.highlightIds}
                     selectIds={this.props.selectIds}
                     width={this.props.width}
                     style={{float: `left`}} />
      </div>
    )
  }
}

AnatomogramContainer.propTypes = {
  atlasUrl: PropTypes.string.isRequired,
  pathToResources: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  showIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlightIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number
}

AnatomogramContainer.defaultProps = {
  width: 500
}

export default AnatomogramContainer
