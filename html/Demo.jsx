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

                <p>Currently hovered in anatomogram:</p>
                {this.props.ontologyIdsToHighlight.length ?
                    <ul>
                        {this.props.ontologyIdsToHighlight.map(el =>
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
          pathToFolderWithBundledResources: `/dist/`,
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
          {this._getOntologyIdsForChosenSpecies().map((selectedId)=>{
            return (
              <span>
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
