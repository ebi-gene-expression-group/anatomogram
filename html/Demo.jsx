const React = require(`react`);
const idsForSvgs = require(`../resources/json/idsForSvgs.json`);
const svgsForSpecies = require(`../resources/json/svgsForSpecies.json`);
const getSvgsForSpecies = require(`../src/imagesAvailable.js`).GetSvgsForSpecies;
const AnatomogramFactory = require(`../src/AnatomogramFactory.jsx`);

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
        return (
            <div style={{backgroundColor:`beige`, minHeight:`280px`, maxWidth:`450px`}}>
                <h4>A demo component stubbing out the heatmap</h4>
                <div> <i>Select of one or more ontologyIds- corresponds to hover events in heatmap</i></div>

                <select style={{height: `100px`}} multiple={true} value={this.state.ontologyIdsUnderFocus}
                        onChange={ev => {
                            const selectedId = ev.target.value;
                            this.setState(previousState =>
                                ({
                                    ontologyIdsUnderFocus:
                                        previousState.ontologyIdsUnderFocus.includes(selectedId) ?
                                            previousState.ontologyIdsUnderFocus.filter(el => el !== selectedId) :
                                            previousState.ontologyIdsUnderFocus.concat([selectedId])
                                })
                            )}}>
                    {this.props.ontologyIdsForChosenSpecies.map(id =>
                        (
                            <option key={id} value = {id} >{id}</option>
                        )
                    )}
                </select>

                <p>Currently hovered in anatomogram:</p>
                {this.state.ontologyIdsUnderFocus.length ?
                    <ul>
                        {this.state.ontologyIdsUnderFocus.map(el =>
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
      return { idsExpressedInExperiment: this._getOntologyIdsForChosenSpecies().filter(() => Math.random() > 0.7) }
  },
  render() {
      const anatomogramConfig = {
          pathToFolderWithBundledResources: `/dist/`,
          anatomogramData: {
              species: this.props.species
          },
          expressedTissueColour: `red`,
          hoveredTissueColour: `purple`,
          idsExpressedInExperiment: this.state.idsExpressedInExperiment
      };

      const Wrapped =
          AnatomogramFactory.wrapComponent(
              anatomogramConfig, DemoComponent, { ontologyIdsForChosenSpecies: this._getOntologyIdsForChosenSpecies() });

      return (
          <div>
              <p>Ids selected in experiment:</p>
              <select style={{height: `100px`}} multiple={true} value={this.state.idsExpressedInExperiment}
                      onChange={ev => {
                          const selectedId = ev.target.value;
                          this.setState(function(previousState) {
                              return {
                                  idsExpressedInExperiment:
                                      previousState.idsExpressedInExperiment.includes(selectedId) ?
                                          previousState.idsExpressedInExperiment.filter(el => el!==selectedId) :
                                          previousState.idsExpressedInExperiment.concat([selectedId])
                              }
                          })
                      }}>
              {this._getOntologyIdsForChosenSpecies().map(id =>
                  (
                      <option key={id} value = {id} >{id}</option>
                  )
              )}
              </select>
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
                    {Object.keys(svgsForSpecies).map(species =>
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

module.exports = Demo;
