import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import AnatomogramContainer from '../src/index'
import svgsMetadata from '../src/json/svgsMetadata.json'

import {xor} from 'lodash'

const unique = (value, index, self) => self.indexOf(value) === index

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const allSpecies =
  svgsMetadata
    .map((svgMetadata) => svgMetadata.species)
    .filter(unique)
    .sort()

const getAllIds = (species) =>
  svgsMetadata
    .filter((svgMetadata) => svgMetadata.species === species)
    .reduce((acc, svgMetadata) => acc.concat(svgMetadata.ids), [])
    .filter(unique)
    .sort()

class AnatomogramDemo extends React.Component {

  constructor(props) {
    super(props)

    const selectedSpecies = allSpecies.includes(`homo_sapiens`) ? `homo_sapiens` : allSpecies[0]

    this.state = {
      selectedSpecies: selectedSpecies,
      allIds: getAllIds(selectedSpecies),
      showIds: [],
      highlightIds: [],
      selectIds: []
    }

    this._handleSelectOnChange = this._handleSelectOnChange.bind(this)
    this._handleCheckboxOnChange = this._handleCheckboxOnChange.bind(this)
    this._handleOnClick = this._handleOnClick.bind(this)
    this._addRemoveFromSelectIds = this._addRemoveFromSelectIds.bind(this)
  }

  _handleSelectOnChange(event) {
    this.setState({
      selectedSpecies: event.target.value,
      allIds: getAllIds(event.target.value)
    })
  }

  _handleCheckboxOnChange(event, stateField) {
    const newShowIds =
      event.target.checked ?
        this.state[stateField].concat(event.target.value) :
        this.state[stateField].filter((id) => event.target.value !== id)

    this.setState({
      [stateField]: newShowIds
    })
  }

  _handleOnClick(allOrNone, stateField) {
    this.setState({
      [stateField]: allOrNone ? Array.from(this.state.allIds) : []
    })
  }

  _addRemoveFromSelectIds(ids) {

    this.setState({
      selectIds: xor(this.state.selectIds, ids)
    })
  }

  render() {
    return (
      <div className={`row`}>
        <div className={`row`}>
          <div className={`small-3 small-centered columns`}>
            <select value={this.state.selectedSpecies} onChange={this._handleSelectOnChange}>
              {[...allSpecies, `foobar`].map((species) => <option key={species} value={species}>{capitalizeFirstLetter(species.replace(`_`, ` `))}</option>)}
            </select>
          </div>
        </div>

        <div className={`row`}>
          <div className={`small-4 columns`} id={`anatomogramContainer`}>
            <AnatomogramContainer
              {...this.props}
              species={this.state.selectedSpecies}
              showIds={this.state.showIds}
              highlightIds={this.state.highlightIds}
              selectIds={this.state.selectIds}
              onClick={this._addRemoveFromSelectIds} />
          </div>

          <div className={`small-8 columns`}>
            <div className={`row`}>
              <div className={`small-4 columns`}>
                <button className={`button`} onClick={() => {this._handleOnClick(true, `showIds`)}}>Show all</button>
                <button className={`button`} onClick={() => {this._handleOnClick(false, `showIds`)}}>Hide all</button>
              </div>
              <div className={`small-4 columns`}>
                <button className={`button`} onClick={() => {this._handleOnClick(true, `highlightIds`)}}>Highlight all</button>
                <button className={`button`} onClick={() => {this._handleOnClick(false, `highlightIds`)}}>Unhighlight all</button>
              </div>
              <div className={`small-4 columns`}>
                <button className={`button`} onClick={() => {this._handleOnClick(true, `selectIds`)}}>Select all</button>
                <button className={`button`} onClick={() => {this._handleOnClick(false, `selectIds`)}}>Unselect all</button>
              </div>
            </div>

            <div className={`row column`}>
              <p>
                Use the first checkbox to show the tissue, the second to highlight it, and the third to select it.
                Hover over a tissue to display its name. Click on it to select it.
              </p>
            </div>

            <div className={`row column`}>
              {Array.from(this.state.allIds).sort().map((id) =>
                <div key={id} style={{display: `inline-block`}}>
                  <input
                    type={`checkbox`}
                    name={`showIds`} value={id}
                    onChange={(e) => {this._handleCheckboxOnChange(e, `showIds`)}}
                    checked={this.state.showIds.includes(id)}/>
                  <input
                    type={`checkbox`}
                    name={`highlightIds`} value={id}
                    onChange={(e) => {this._handleCheckboxOnChange(e, `highlightIds`)}}
                    checked={this.state.highlightIds.includes(id)}/>
                  <input type={`checkbox`}
                    name={`selectIds`} value={id}
                    onChange={(e) => {this._handleCheckboxOnChange(e, `selectIds`)}}
                    checked={this.state.selectIds.includes(id)}/>
                  <label>{id}</label>
                </div>)}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

AnatomogramDemo.propTypes = {
  atlasUrl: PropTypes.string,
  pathToResources: PropTypes.string
}

const render = function (options, target) {
  ReactDOM.render(<AnatomogramDemo {...options}/>, document.getElementById(target))
}

export {AnatomogramDemo as default, render}
