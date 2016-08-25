"use strict";

//*------------------------------------------------------------------*

var React = require('react');
var ReactDOM = require('react-dom');

var AnatomogramImage = require('./AnatomogramImage.jsx');
var SelectionIcon = require('./SelectionIcon.jsx');

//*------------------------------------------------------------------*

var Anatomogram = React.createClass({
    propTypes: {
        pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
        expressedTissueColour: React.PropTypes.string.isRequired,
        hoveredTissueColour: React.PropTypes.string.isRequired,
        availableAnatomograms : React.PropTypes.arrayOf(
          React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            anatomogramFile: React.PropTypes.string.isRequired
          })
        ).isRequired,
        height: React.PropTypes.number.isRequired,
        whenMousedOverIdsChange: React.PropTypes.func,
        allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        idsToBeHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    getInitialState: function() {
        return {
          selectedType: this.props.availableAnatomograms[0].type,
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
                      file={this._selectedFile()}
                      {...this.props} />
                </div>
            </div>
        );
    },

    _anatomogramSelectImageButtons : function(){
      return (
        this.props.availableAnatomograms.length < 2
        ? []
        : this.props.availableAnatomograms
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

    _afterUserSelectedAnatomogram: function(newSelectedType) {
        if (newSelectedType !== this.state.selectedType) {
            this.setState({selectedType: newSelectedType});
        }
    },

    _selectedFile: function() {
      var type = this.state.selectedType;
      return (
        this.props.availableAnatomograms
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
