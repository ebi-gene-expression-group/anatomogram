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
  species: PropTypes.string.isRequired
}



export default Anatomogram
