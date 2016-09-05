"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

//*------------------------------------------------------------------*

var idsForSvgs = require('../assets/json/idsForSvgs.json');
var svgsForSpecies = require('../assets/json/svgsForSpecies.json');
var getSvgsForSpecies = require('../src/imagesAvailable.js');
var AnatomogramFactory = require('../src/AnatomogramFactory.jsx');
//*------------------------------------------------------------------*
var DemoComponent = React.createClass({
  propTypes:{
    onOntologyIdIsUnderFocus: React.PropTypes.func.isRequired,
    ontologyIdsToHighlight: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  },

  getInitialState: function(){
    return {
      ontologyIdsUnderFocus: [],
    }
  },
  componentDidUpdate: function(){
    this.props.onOntologyIdIsUnderFocus(this.state.ontologyIdsUnderFocus);
  },
  render: function(){
    return (
      <div>
        <p> This is the component stubbing out the Expression Atlas heatmap </p>
        <div> Select of one or more ontologyIds- corresponds to hover events in heatmap</div>
        <select style={{height: '100px'}} multiple={true} value={this.state.ontologyIdsUnderFocus}
          onChange={function(ev){
            var selectedId = ev.target.value;
            this.setState(function(previousState){
              return {
                ontologyIdsUnderFocus:(
                  previousState.ontologyIdsUnderFocus.indexOf(selectedId)>-1
                  ? previousState.ontologyIdsUnderFocus.filter(function(el){
                    return el!==selectedId
                  })
                  : previousState.ontologyIdsUnderFocus.concat([selectedId])
                )
              }
            })}.bind(this)}>
          {this.props.ontologyIdsForChosenSpecies.map(function(id){
            return (
              <option key={id} value = {id} >{id}</option>
            )
          })}
        </select>
        <p> Currently hovered in anatomogram: </p>
        {this.props.ontologyIdsToHighlight.map(function(el){
          return (
            <span key={el}>{el}</span>
          )
        })}
    </div>

    )
  }
});

var DemoContainer = React.createClass({
  _getOntologyIdsForChosenSpecies: function(){
    return (
      [].concat.apply([],
        getSvgsForSpecies(this.props.species).map(function(el){
          return el.ids;
        })
      ).filter(function uniq(el,ix,self){
        return self.indexOf(el)==ix
      })
    );
  },
  getInitialState: function(){
    return {
      idsExpressedInExperiment: this._getOntologyIdsForChosenSpecies().filter(function(e){
        return Math.random()>0.7
      })
    }
  },
  render: function(){
    var anatomogramConfig = {
      pathToFolderWithBundledResources: "..",
      anatomogramData: {
        species: this.props.species
      },
      expressedTissueColour: "fireBrick",
      hoveredTissueColour: "purple",
      idsExpressedInExperiment: this.state.idsExpressedInExperiment
    }
    var Wrapped = AnatomogramFactory.wrapComponent(anatomogramConfig, DemoComponent, {ontologyIdsForChosenSpecies:this._getOntologyIdsForChosenSpecies()})

    return (
      <div>
        <p> Ids selected in experiment: </p>
        <select style={{height: '100px'}} multiple={true} value={this.state.idsExpressedInExperiment}
          onChange={function(ev){
            var selectedId = ev.target.value;
            this.setState(function(previousState){
              return {
                idsExpressedInExperiment:(
                  previousState.idsExpressedInExperiment.indexOf(selectedId)>-1
                  ? previousState.idsExpressedInExperiment.filter(function(el){
                    return el!==selectedId
                  })
                  : previousState.idsExpressedInExperiment.concat([selectedId])
                )
              }
            })}.bind(this)}>
          {this._getOntologyIdsForChosenSpecies().map(function(id){
            return (
              <option key={id} value = {id} >{id}</option>
            )
          })}
        </select>
        <Wrapped/>
      </div>
    )
  }
});

var Demo = React.createClass({

  getInitialState: function(){
    return {
      species: "gallus gallus"
    }
  },


  render:  function(){
    return (
      <div>
        <p>Select species </p>
        <select value={this.state.species} onChange={function(el){this.setState({species:el.target.value})}.bind(this)}>
          {Object.keys(svgsForSpecies).map(function(species){
            return (
              <option key={species} value = {species}>{species}</option>
            )
          })}
        </select>
        <DemoContainer species={this.state.species} />
      </div>
    )
  }
});

module.exports = Demo;
