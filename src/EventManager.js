import React from 'react'
import PropTypes from 'prop-types'
import EventEmitter from 'events'

import AnatomogramContainer from './AnatomogramContainer'

class EventManager extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      highlightIds: new Set(this.props.highlightIds),
      selectIds: new Set(this.props.selectIds)
    }

    this._addIds = this._addIds.bind(this)
    this._removeIds = this._removeIds.bind(this)
  }

  render() {
    return <AnatomogramContainer {...this.props}
                                 highlightIds={Array.from(this.state.highlightIds)}
                                 // selectIds={Array.from(this.state.selectIds)}
                                 onMouseOver={(id) => {
                                   this.props.eventEmitter.emit(`gxaAnatomogramTissueMouseEnter`, id)
                                 }}
                                 onMouseOut={(id) => {
                                   this.props.eventEmitter.emit(`gxaAnatomogramTissueMouseLeave`, id)
                                 }}/>
  }

  componentDidMount() {
    this.props.eventEmitter.on(`gxaAnatomogramTissueHighlight`, (ids) => { this._addIds(`highlightIds`, ids) })
    this.props.eventEmitter.on(`gxaAnatomogramTissueUnhighlight`, (ids) => { this._removeIds(`highlightIds`, ids) })
    this.props.eventEmitter.on(`gxaAnatomogramTissueSelect`, (ids) => { this._addIds(`selectIds`, ids) })
    this.props.eventEmitter.on(`gxaAnatomogramTissueUnselect`, (ids) => { this._removeIds(`selectIds`, ids) })

  }

  _addIds(stateField, ids) {
    const nextIds = Array.from(this.state[stateField]).concat(ids)

    this.setState({
      [stateField]: new Set(nextIds)
    })
  }

  _removeIds(stateField, ids) {
    const nextIds = new Set(this.state[stateField])

    if (Array.isArray(ids)) {
      ids.forEach((id) => nextIds.delete(id))
    } else {
      nextIds.delete(id)
    }

    this.setState({
      [stateField]: nextIds
    })
  }
}


EventManager.propTypes = {
  eventEmitter: PropTypes.instanceOf(EventEmitter).isRequired,
  atlasUrl: PropTypes.string.isRequired,
  pathToResources: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  showIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlightIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number
}

export default EventManager
