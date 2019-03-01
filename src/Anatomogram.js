import React from 'react'
import PropTypes from 'prop-types'

import Switcher from './Switcher'
import AnatomogramSvg from './AnatomogramSvg'
import {getDefaultView, supportedSpecies} from './Assets'

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

  static getDerivedStateFromProps(props, state) {
    if (props.species !== state.species) {
      return {
        species: props.species,
        selectedView: getDefaultView(props.species)
      }
    }
    return null
  }

  render() {
    return (
      supportedSpecies.includes(this.props.species) &&
        <div>
          <Switcher
            atlasUrl={this.props.atlasUrl}
            species={this.props.species}
            selectedView={this.state.selectedView}
            onChangeView={this._switchAnatomogramView} />

          <AnatomogramSvg
            atlasUrl={this.props.atlasUrl}
            {...this.props}
            selectedView={this.state.selectedView} />
        </div>
    )
  }
}

Anatomogram.propTypes = {
  atlasUrl: PropTypes.string,
  species: PropTypes.string.isRequired
}

Anatomogram.defaultProps = {
  atlasUrl: `https://www.ebi.ac.uk/gxa/`
}

export default Anatomogram
