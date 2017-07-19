import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactSVG from 'react-svg'

import URI from 'urijs'

import svgsMetadata from './json/svgsMetadata.json'

class Anatomogram extends React.Component {
  constructor(props) {
    super(props)

    this._attachListeners = this._attachListeners.bind(this)
    this._getSvgElementById = this._getSvgElementById.bind(this)
    this._getEfoLayerGroup = this._getEfoLayerGroup.bind(this)
  }

  _paintIds(ids, colour, opacity) {
    ids.forEach((id) => {
      const e = this._getSvgElementById(id)

      // We might be showing an ID which is not part of the displayed anatomogram (e.g. heart in brain)
      if (e) {
        e.style.fill = colour
        e.style.opacity = opacity
      }
    })
  }

  _attachMouseOverMouseOutListeners(ids, mouseOverColour, mouseOverOpacity) {
    ids.forEach((id) => {
      const e = this._getSvgElementById(id)

      if (e) {
        e.addEventListener(`mouseover`, () => {
          e.style.fill = mouseOverColour
          e.style.opacity = mouseOverOpacity
        })

        const originalColour = e.style.fill
        const originalOpacity = e.style.opacity
        e.addEventListener(`mouseout`, () => {
          e.style.fill = originalColour
          e.style.opacity = originalOpacity
        })
      }
    })
  }

  _getSvgElementById(id) {
    const efoLayerGroup = this._getEfoLayerGroup()

    if (efoLayerGroup) {
      for (let i = 0 ; i < efoLayerGroup.children.length ; i++) {
        if (efoLayerGroup.children[i].id === id ) {
          if (efoLayerGroup.children[i].attributes[`xlink:href`]) {
            return this._getSvgElementById(efoLayerGroup.children[i].attributes[`xlink:href`].value.substring(1))
          }
          else {
            return efoLayerGroup.children[i]
          }
        }
      }
    }

    return undefined
  }

  _getEfoLayerGroup() {
    const svgGroups = ReactDOM.findDOMNode(this.svgRef).getElementsByTagName(`g`)
    for (let i = 0 ; i < svgGroups.length ; i++) {
      if (svgGroups[i].id === `LAYER_EFO`) {
        return svgGroups[i]
      }
    }

    return undefined
  }

  _attachListeners() {
    const {showIds, showColour, showOpacity,
           highlightIds, highlightColour, highlightOpacity,
           selectIds, selectColour, selectOpacity} = this.props

    this._paintIds(showIds, showColour, showOpacity)
    this._paintIds(highlightIds, highlightColour, highlightOpacity)
    this._paintIds(selectIds, selectColour, selectOpacity)

    this._attachMouseOverMouseOutListeners([...showIds, ...highlightIds], selectColour, selectOpacity)
    this._attachMouseOverMouseOutListeners(selectIds, selectColour, selectOpacity + 0.1)
  }

  componentDidUpdate() {
    this._attachListeners()
  }

  componentDidMount() {
    this._attachListeners()
  }

  render() {
    const aspectRatio = svgsMetadata[this.props.filename].width / svgsMetadata[this.props.filename].height
    const {height, width} = this.props

    const sizeStyle = {}
    if (height && width) {
      sizeStyle.width = width
      sizeStyle.height = height
    } else if (height) {
      sizeStyle.height = height
      sizeStyle.width = height * aspectRatio
    } else {  // if (width)
      sizeStyle.width = width
      sizeStyle.height = width / aspectRatio
    }
    return (
      <div style={this.props.style}>
        <ReactSVG
          ref={(svgRef) => { this.svgRef = svgRef }}
          path={URI(`svg/${this.props.filename}`, this.props.urlToResources).toString()}

          style={sizeStyle}
        />
      </div>
    )
  }
}

Anatomogram.propTypes = {
  urlToResources: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  showIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlightIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  showColour: PropTypes.string,
  highlightColour: PropTypes.string,
  selectColour: PropTypes.string,
  showOpacity: PropTypes.number,
  highlightOpacity: PropTypes.number,
  selectOpacity: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object
}

Anatomogram.defaultProps = {
  showColour: `grey`,
  highlightColour: `red`,
  selectColour: `purple`,
  showOpacity: 0.4,
  highlightOpacity: 0.5,
  selectOpacity: 0.6
}

export default Anatomogram
