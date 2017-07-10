import React from 'react';
import {getSvgsForSpecies} from '../src/imagesAvailable.js';
import AnatomogramFactory from '../src/AnatomogramFactory.jsx';

import SvgsForSpecies from '../resources/json/svgsForSpecies.json';
// import IdsForSvgs from '../resources/json/idsForSvgs.json';

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

const DemoComponent = React.createClass({
    propTypes: {
        // onOntologyIdIsUnderFocus: React.PropTypes.func.isRequired,
        ontologyIdsForChosenSpecies: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    getInitialState() {
        return { ontologyIdsUnderFocus: [] }
    },

    // componentDidUpdate: function(){
    //     // this.props.onOntologyIdIsUnderFocus(this.state.ontologyIdsUnderFocus);
    // },

    render() {
        //sleepFor(500)
        return (
            <div style={{backgroundColor:`beige`, minHeight:`280px`, maxWidth:`450px`}}>

                <p>Currently hovered in anatomogram:</p>
                {this.props.ontologyIdsToHighlight.length ?
                    <ul>
                        {this.props.ontologyIdsToHighlight.filter((e,ix,self) => (self.indexOf(e) === ix)).map(el =>
                            (
                                <li key={el}>{el}</li>
                            )
                        )}
                    </ul> :
                    <span>None</span>}
            </div>

        )
    }
});

const DemoContainer = React.createClass({
    propTypes: {
        species: React.PropTypes.string.isRequired
    },

    _getOntologyIdsForChosenSpecies() {
        return (
            [].concat.apply([],
                getSvgsForSpecies('', this.props.species).map(el => el.ids)
            )
            .filter((el,ix,self) => self.indexOf(el) === ix)  // uniq
            .sort()
        );
    },

  getInitialState() {
      return { showAll: false, idsExpressedInExperiment: this._getOntologyIdsForChosenSpecies().filter(() => Math.random() > 0.7) }
  },
  render() {
      const anatomogramConfig = {
          pathToResources: `../dist/`,
          anatomogramData: {
              species: this.props.species,
              allSvgPathIds: this.state.showAll? undefined: this.state.idsExpressedInExperiment
          },
          expressedTissueColour: `red`,
          hoveredTissueColour: `purple`,
          idsExpressedInExperiment: this.state.idsExpressedInExperiment
      };

      const Wrapped =
          AnatomogramFactory.wrapComponent(
              anatomogramConfig, DemoComponent, { ontologyIdsForChosenSpecies: this.state.idsExpressedInExperiment });

      return (
        <div>
          <div>
            <input type="checkbox" checked={this.state.showAll} onChange={ev => {
              this.setState(function(previousState) {
                  return {
                      showAll: !previousState.showAll
                  }
              })
            }}/>
            Show all
          </div>
          <p>Ids selected in experiment:
          </p>
          {this._getOntologyIdsForChosenSpecies().filter((e,ix,self) => (self.indexOf(e) === ix)).map((selectedId)=>{
            return (
              <span key={selectedId}>
                <input type="checkbox" checked={this.state.idsExpressedInExperiment.indexOf(selectedId)>-1} onChange={ev => {
                  this.setState(function(previousState) {
                      return {
                          idsExpressedInExperiment:
                              previousState.idsExpressedInExperiment.includes(selectedId) ?
                                  previousState.idsExpressedInExperiment.filter(el => el!==selectedId) :
                                  previousState.idsExpressedInExperiment.concat([selectedId])
                      }
                  })
                }}/>
                {selectedId}
              </span>
            )
          })}
        <Wrapped/>
      </div>
    )
  }
});

const Demo = React.createClass({
    getInitialState() {
        return { species: "gallus gallus" }
    },

    handleChange(event) {
        this.setState({ species: event.target.value });
    },

    render() {
        return (
            <div>
                <h2>Expression Atlas Anatomogram</h2>
                <div> Select species</div>

                <select value={this.state.species} onChange={this.handleChange}>
                    {Object.keys(SvgsForSpecies).map(species =>
                        (
                            <option key={species} value={species}>{species}</option>
                        )
                    )}
                </select>

                <br/>
                <DemoContainer species={this.state.species} />
            </div>
    )
  }
});

export default Demo;
