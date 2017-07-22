import React from 'react'
import PropTypes from 'prop-types'
import ReactSVG from 'react-svg'

import hash from 'object-hash'
import URI from 'urijs'

const arrayDifference = (arr1, arr2) =>
  Array.isArray(arr1) && Array.isArray(arr2) ? arr1.filter((e) => !arr2.includes(e)) : arr1

const getSvgElementById = (svgDomNode) => {
  const getEfoLayerGroup = (svgDomNode) => {
    const svgGroups = svgDomNode.getElementsByTagName(`g`)
    for (let i = 0 ; i < svgGroups.length ; i++) {
      if (svgGroups[i].id === `LAYER_EFO`) {
        return svgGroups[i]
      }
    }
  }

  const efoLayerGroup = getEfoLayerGroup(svgDomNode)

  function _getSvgElementById(id) {
    if (efoLayerGroup) {
      for (let i = 0 ; i < efoLayerGroup.children.length ; i++) {
        if (efoLayerGroup.children[i].id === id ) {
          if (efoLayerGroup.children[i].attributes[`xlink:href`]) {
            return _getSvgElementById(efoLayerGroup.children[i].attributes[`xlink:href`].value.substring(1))
          }
          else {
            return efoLayerGroup.children[i]
          }
        }
      }
    }
  }

  return _getSvgElementById
}

const paintIds = (ids, colour, opacity, getSvgElementById) => {
  ids.forEach((id) => {
    const e = getSvgElementById(id)

    // We might be showing an ID which is not part of the displayed anatomogram (e.g. heart in brain)
    if (e) {
      e.style.fill = colour
      e.style.opacity = opacity
    }
  })
}

const addMouseOverMouseOutListeners = (ids, mouseOverColour, mouseOverOpacity, mouseOverCallback, mouseOutCallback, getSvgElementById) => {
  ids.forEach((id) => {
    const e = getSvgElementById(id)

    if (e) {
      e.addEventListener(`mouseover`, () => {
        e.style.fill = mouseOverColour
        e.style.opacity = mouseOverOpacity
        mouseOverCallback(id)
      })

      const originalColour = e.style.fill
      const originalOpacity = e.style.opacity
      e.addEventListener(`mouseout`, () => {
        e.style.fill = originalColour
        e.style.opacity = originalOpacity
        mouseOutCallback(id)
      })
    }
  })
}

const attachCallbacks = (ids, eventName, callback, getSvgElementById) => {
  ids.forEach((id) => {
    const e = getSvgElementById(id)

    if (e) {
      e.addEventListener(eventName, () => { callback(id) })
    }
  })
}

class Anatomogram extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return hash.MD5([nextProps.filename, nextProps.showIds, nextProps.highlightIds, nextProps.selectIds]) !==
           hash.MD5([this.props.filename, this.props.showIds, this.props.highlightIds, this.props.selectIds])
  }

  // ReactSVG loads the SVG file asynchronously (hence the callback prop). We don’t use componentDidUpdate or
  // componentDidMount because they can’t guarantee that the SVG is already loaded when they’re run. We can see this
  // happening when we Show All in human, and we switch to male/female for the first time, only the outline is shown.
  _initialiseSvgElements(getSvgElementById) {
    const {showIds, showColour, showOpacity,
           highlightIds, highlightColour, highlightOpacity,
           selectIds, selectColour, selectOpacity,
           onMouseOver, onMouseOut, onClick} = this.props

    const uniqueShowIds = arrayDifference(showIds, [...highlightIds, ...selectIds])
    const uniqueHighlightIds = arrayDifference(highlightIds, selectIds)

    paintIds(uniqueShowIds, showColour, showOpacity, getSvgElementById)
    paintIds(uniqueHighlightIds, highlightColour, highlightOpacity, getSvgElementById)
    paintIds(selectIds, selectColour, selectOpacity, getSvgElementById)

    addMouseOverMouseOutListeners(uniqueShowIds, highlightColour, highlightOpacity, onMouseOver, onMouseOut, getSvgElementById)
    addMouseOverMouseOutListeners(uniqueHighlightIds, highlightColour, highlightOpacity + 0.2, onMouseOver, onMouseOut, getSvgElementById)
    addMouseOverMouseOutListeners(selectIds, selectColour, selectOpacity + 0.2, onMouseOver, onMouseOut, getSvgElementById)

    attachCallbacks([...uniqueShowIds, ...uniqueHighlightIds, ...selectIds], `click`, onClick, getSvgElementById)
  }
  
  render() {
    return (
      <div style={{display: `inline-block`, verticalAlign: `top`, width: `90%`}}>
        <ReactSVG
          path={URI(`svg/${this.props.filename}`, this.props.urlToResources).toString()}
          callback={svgDomNode => { this._initialiseSvgElements(getSvgElementById(svgDomNode)) }}
          style={{width: `100%`, height: `auto`}}
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

  showColour: PropTypes.string.isRequired,
  highlightColour: PropTypes.string.isRequired,
  selectColour: PropTypes.string.isRequired,

  showOpacity: PropTypes.number.isRequired,
  highlightOpacity: PropTypes.number.isRequired,
  selectOpacity: PropTypes.number.isRequired,

  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Anatomogram
