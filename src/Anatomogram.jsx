"use strict";

//*------------------------------------------------------------------*

var React = require('react');
var ReactDOM = require('react-dom');

var imagesAvailableForSpecies = require('./imagesAvailable.js');

var AnatomogramImage = require('./AnatomogramImage.jsx');
var SelectionIcon = require('./SelectionIcon.jsx');

var EventEmitter = require('events');

//*------------------------------------------------------------------*

var Anatomogram = React.createClass({
    propTypes: {
        pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
        anatomogramData: React.PropTypes.shape({
          species: React.PropTypes.string.isRequired,
          allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
          /** There may also be other properties sent for compatibility with the older widget.*/
        }).isRequired,
        expressedTissueColour: React.PropTypes.string.isRequired,
        hoveredTissueColour: React.PropTypes.string.isRequired,
        profileRows: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.string,
                name: React.PropTypes.string.isRequired,
                expressions: React.PropTypes.arrayOf(
                    React.PropTypes.shape({
                        factorName: React.PropTypes.string,
                        color: React.PropTypes.string,
                        value: React.PropTypes.number, // missing represents "NA"/"NT"
                        svgPathId: React.PropTypes.string
                    })
                ).isRequired
            })
        ).isRequired,
        eventEmitter: React.PropTypes.instanceOf(EventEmitter),
        atlasBaseURL: React.PropTypes.string.isRequired
    },

    _availableAnatomograms: function() {
      var result = [];
      var o = imagesAvailableForSpecies(this.props.anatomogramData.species);
      for(var anatomogramType in o){
        if(o.hasOwnProperty(anatomogramType)&& o[anatomogramType]){
          result.push({
            type:anatomogramType,
            anatomogramFile: this.props.pathToFolderWithBundledResources+"/"+o[anatomogramType],
          })
        }
      }
      return result;
    },

    getInitialState: function() {
        return {
          selectedType: this._availableAnatomograms()[0].type,
        };
    },

    render: function () {
        function containsHuman(str) {
            return str.indexOf("human") > -1;
        }

        return (
            <div className="gxaAnatomogram" style={{display: "table", paddingTop: "4px"}}>
                <div style={{display: "table-row"}}>
                    <div style={{display: "table-cell", verticalAlign: "top"}}>
                      {this._anatomogramSelectImageButtons()}
                    </div>
                    <AnatomogramImage
                      key={this.state.selectedType}
                      ref="currentImage"
                      file={this._getAnatomogramSVGFile(this.state.selectedType)}
                      height={containsHuman(this.props.anatomogramData.maleAnatomogramFile) ? "375" : "265"}
                      expressedFactorsPerRow={
                        this.props.profileRows
                        .reduce(function(result,row){
                          result[row.name] =
                            row.expressions.filter(function(expression){
                              return expression.value;
                            })
                            .map(function(expression){
                              return expression.svgPathId
                            });
                          return result;
                        },{})}
                      allSvgPathIds={this.props.anatomogramData.allSvgPathIds}
                      eventEmitter={this.props.eventEmitter}
                      expressedTissueColour={this.props.expressedTissueColour}
                      hoveredTissueColour={this.props.hoveredTissueColour}/>
                </div>
            </div>
        );
    },

    _anatomogramSelectImageButtons : function(){
      return (
        this._availableAnatomograms().length < 2
        ? []
        : this._availableAnatomograms()
          .map(function(availableAnatomogram) {
             return(
                 <SelectionIcon
                  key={availableAnatomogram.type + "_toggle"}
                  pathToFolderWithBundledResources={this.props.pathToFolderWithBundledResources}
                  anatomogramType={availableAnatomogram.type}
                  selected={this.state.selectedType === availableAnatomogram.type}
                  onClick={function(){this._afterUserSelectedAnatomogram(availableAnatomogram.type);}.bind(this)}/>
             )
          }.bind(this))
      );
    },

    _registerListenerIfNecessary: function(name, fn){
        if (this.props.eventEmitter &&
            this.props.eventEmitter._events &&
            !this.props.eventEmitter._events.hasOwnProperty(name)){
            this.props.eventEmitter.addListener(name, fn);
          }
    },

    componentDidMount: function() {
        this._registerListenerIfNecessary("gxaHeatmapColumnHoverChange", this._highlightPath);
        this._registerListenerIfNecessary("gxaHeatmapRowHoverChange", this._highlightRow);
    },

    componentDidUpdate: function () {
      this._registerListenerIfNecessary("gxaHeatmapColumnHoverChange", this._highlightPath);
      this._registerListenerIfNecessary("gxaHeatmapRowHoverChange", this._highlightRow);
    },

    _afterUserSelectedAnatomogram: function(newSelectedType) {
        if (newSelectedType !== this.state.selectedType) {
            this.setState({selectedType: newSelectedType});
        }
    },

    _highlightPath: function(svgPathId) {
        this.refs.currentImage._highlightPath(svgPathId);
    },

    _highlightRow: function(rowId) {
      this.refs.currentImage._highlightRow(rowId);
    },

    _getAnatomogramSVGFile: function(type) {
      return (
        this._availableAnatomograms()
        .filter(function(e,ix){
          return (
            e.type === type
          )
        })
        .map(function(e){
          return e.anatomogramFile;
        })
        .concat([""])
        [0]
      );
    }

});

//*------------------------------------------------------------------*

module.exports = Anatomogram;
