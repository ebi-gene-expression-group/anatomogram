import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import AnatomogramContainer from '../src/index'
import availableAnatomograms from '../src/json/svgs.json'
import svgsMetadata from '../src/json/svgsMetadata.json'

const onlyUnique = (e, i, arr) => arr.indexOf(e) === i

class AnatomogramDemo extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedSpecies: Object.keys(availableAnatomograms)[0],
      showIds: [],
      selectIds: [],
      highlightIds: []
    }

    this._handleChange = this._handleChange.bind(this)

    this._handleShowCheckboxOnChange = this._handleShowCheckboxOnChange.bind(this)
    this._handleShowAllOnClick = this._handleShowAllOnClick.bind(this)
    this._handleHideAllOnClick = this._handleHideAllOnClick.bind(this)

    this._handleSelectCheckboxOnChange = this._handleSelectCheckboxOnChange.bind(this)
    this._handleSelectAllOnClick = this._handleSelectAllOnClick.bind(this)
    this._handleUnselectAllOnClick = this._handleUnselectAllOnClick.bind(this)

    this._handleCheckboxOnMouseOver = this._handleCheckboxOnMouseOver.bind(this)
  }

  _handleChange(event) {
    this.setState({
      selectedSpecies: event.target.value
    })
  }

  _handleShowCheckboxOnChange(event) {
    const checked = event.target.checked
    const newShowIds =
      checked ?
        this.state.showIds.concat(event.target.value) :
        this.state.showIds.filter((id) => id !== event.target.value)

    this.setState({
      showIds: newShowIds
    })
  }

  _handleSelectCheckboxOnChange(event) {
    const checked = event.target.checked
    const newSelectIds =
      checked ?
        this.state.selectIds.concat(event.target.value) :
        this.state.selectIds.filter((id) => id !== event.target.value)

    this.setState({
      selectIds: newSelectIds
    })
  }

  _handleShowAllOnClick() {
    const allIds =
      Object.keys(svgsMetadata)
        .filter((svgFilename) => svgFilename.startsWith(this.state.selectedSpecies))
        .reduce((acc, svgFilename) => acc.concat(svgsMetadata[svgFilename].ids), [])
        .filter(onlyUnique)
        .sort()

    this.setState({
      showIds: allIds
    })
  }

  _handleHideAllOnClick() {
    this.setState({
      showIds: []
    })
  }

  _handleSelectAllOnClick() {
    const allIds =
      Object.keys(svgsMetadata)
        .filter((svgFilename) => svgFilename.startsWith(this.state.selectedSpecies))
        .reduce((acc, svgFilename) => acc.concat(svgsMetadata[svgFilename].ids), [])
        .filter(onlyUnique)
        .sort()

    this.setState({
      selectIds: allIds
    })
  }

  _handleUnselectAllOnClick() {
    this.setState({
      selectIds: []
    })
  }

  _handleCheckboxOnMouseOver(id) {
    this.setState({
      highlightIds: [id]
    })
  }

  render() {
    const allIds =
      Object.keys(svgsMetadata)
        .filter((svgFilename) => svgFilename.startsWith(this.state.selectedSpecies))
        .reduce((acc, svgFilename) => acc.concat(svgsMetadata[svgFilename].ids), [])
        .filter(onlyUnique)
        .sort()

    return (
      <div className="row">

        <div className="row">
          <div className="small-3 small-centered columns">
            <select value={this.state.selectedSpecies} onChange={this._handleChange}>
              {Object.keys(availableAnatomograms).map((species) => <option key={species}>{species}</option>)}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="small-4 columns" id="anatomogramContainer">
            <AnatomogramContainer {...this.props}
                                  width={300}
                                  species={this.state.selectedSpecies}
                                  showIds={this.state.showIds}
                                  highlightIds={this.state.highlightIds}
                                  selectIds={this.state.selectIds} />
          </div>

          <div className="small-8 columns">
            <div className="row column">
              <button className="button margin-right-small" onClick={this._handleShowAllOnClick}>Show all</button>
              <button className="button" onClick={this._handleHideAllOnClick}>Hide all</button>
            </div>
            <div className="row column">
              <button className="button margin-right-small" onClick={this._handleSelectAllOnClick}>Select all</button>
              <button className="button" onClick={this._handleUnselectAllOnClick}>Unselect all</button>
            </div>

            <div className="row column">
              <p>Click on the first checkbox to show the tissue, on the second to select it, hover to higlight</p>
            </div>

            <div className="row column">
              {allIds.map((id) =>
                <div key={id} style={{display: `inline-block`}}>
                  <input type="checkbox"
                         name="showIds" value={id}
                         onChange={this._handleShowCheckboxOnChange}
                         checked={this.state.showIds.includes(id)}/>
                  <input type="checkbox"
                         name="selectIds" value={id}
                         onChange={this._handleSelectCheckboxOnChange}
                         checked={this.state.selectIds.includes(id)}/>
                  <label onMouseOver={() => {this._handleCheckboxOnMouseOver(id)}} onMouseOut={() => {this._handleCheckboxOnMouseOver()}}>{id}</label>
                </div>)}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

AnatomogramDemo.propTypes = {
  atlasUrl: PropTypes.string.isRequired,
  pathToResources: PropTypes.string.isRequired
}

const render = function (options, target) {
  ReactDOM.render(<AnatomogramDemo {...options}/>, document.getElementById(target))
}

export {render}
