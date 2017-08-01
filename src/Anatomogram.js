import React from 'react'
import PropTypes from 'prop-types'

import Switcher from './Switcher'
import AnatomogramSvg from './AnatomogramSvg'
import {getDefaultView} from './Assets'

class Anatomogram extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedView: getDefaultView(props.species) }
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
        <div>
            <Switcher species={this.props.species}
                      selectedView={this.state.selectedView}
                      onChangeView={this._switchAnatomogramView} />

            <AnatomogramSvg {...this.props}
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

export default Anatomogram
