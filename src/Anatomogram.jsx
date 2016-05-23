"use strict";

//*------------------------------------------------------------------*

var React = require('react');
var ReactDOM = require('react-dom');

var $ = require('jquery');
require('jquery-hc-sticky');
require('jquery-ui-bundle');

var Snap = require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

var EventEmitter = require('events');

//*------------------------------------------------------------------*

var AnatomogramSelectImageButton = React.createClass({
    propTypes: {
        anatomogramId: React.PropTypes.string.isRequired,
        selected: React.PropTypes.bool.isRequired,
        toggleSrcTemplate: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    render: function() {
        var selectedToggleSrc = this.props.toggleSrcTemplate + "_selected.png",
            unselectedToggleSrc = this.props.toggleSrcTemplate + "_unselected.png";

        return(
            <div>
                <img ref="toggleButton" onClick={this._onClick} src={this.props.selected ? selectedToggleSrc : unselectedToggleSrc}
                     style={{width: "20px", height: "20px", padding: "2px"}}/>
            </div>
        );
    },

    componentDidMount: function() {
        $(ReactDOM.findDOMNode(this.refs.toggleButton)).button();
    },

    _onClick: function() {
        this.props.onClick(this.props.anatomogramId);
    }
});


var AnatomogramSelectImageButtons = React.createClass({
    propTypes: {
        selectedId: React.PropTypes.string.isRequired,
        availableAnatomograms: React.PropTypes.array.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    render: function() {
        if (this.props.availableAnatomograms.length > 1) {
            var selectedId = this.props.selectedId,
                onClick = this.props.onClick;
            var anatomogramSelectImageButtons = this.props.availableAnatomograms.map(function(availableAnatomogram) {
               return(
                   <AnatomogramSelectImageButton key={availableAnatomogram.id + "_toggle"}
                    anatomogramId={availableAnatomogram.id} selected={selectedId === availableAnatomogram.id} toggleSrcTemplate={availableAnatomogram.toggleSrcTemplate} onClick={onClick}/>
               )
            });

            return (
                <span>
                    {anatomogramSelectImageButtons}
                </span>
            );

        } else {
            return (
                null
            )
        }
    }

});

var AnatomogramImage = React.createClass({
  propTypes: {
    file: React.PropTypes.string.isRequired,
    height: React.PropTypes.string.isRequired,
    expressedFactors: React.PropTypes.arrayOf(React.PropTypes.string),
    expressedFactorsPerRow: React.PropTypes.object.isRequired,
    allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    expressedTissueColour: React.PropTypes.string.isRequired,
    hoveredTissueColour: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      hoveredPathId: null,
      hoveredRowId: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this._loadAnatomogram(nextProps.file);
  },

  componentDidMount: function() {
      this._loadAnatomogram(this.props.file);
  },

  // Only displays/highlights the relevant tissues to avoid loading the anatomogram every time we hover over a tissue or a factor header
  componentDidUpdate: function() {
      var svg = Snap(ReactDOM.findDOMNode(this.refs.anatomogram)).select("g");
      this._displayAllOrganismParts(svg);
  },


  render: function () {
    return <svg ref="anatomogram" style={{display: "table-cell", width: "230px", height:this.props.height + "px"}} />
  },

  // TODO We could manually highlight un-highlight the affected tissues instead of re-displaying all of them, as setState triggers componentDidUpdate
  _highlightPath: function(svgPathId) {
      this.setState({hoveredPathId: svgPathId});
  },

  _highlightRow: function(rowId) {
      this.setState({hoveredRowId: rowId});
  },

  _loadAnatomogram: function(svgFile) {

      var svgCanvas = Snap(ReactDOM.findDOMNode(this.refs.anatomogram)),
          $svgCanvas = $(ReactDOM.findDOMNode(this.refs.anatomogram)),
          allElements = svgCanvas.selectAll("*");

      if (allElements) {
          allElements.remove();
      }

      var displayAllOrganismPartsCallback = this._displayAllOrganismParts;
      var registerHoverEventsCallback = this._registerHoverEvents;
      Snap.load(
          svgFile,
          function (fragment) {
              var g = fragment.select("g");
              g.transform("S1.6,0,0");
              displayAllOrganismPartsCallback(g);
              registerHoverEventsCallback(g);
              svgCanvas.append(g);
              var img = fragment.select("#ccLogo");
              var heightTranslate = $svgCanvas.height() - 15;
              var widthTranslate = $svgCanvas.width() / 2 - 40;
              img.transform("t"+widthTranslate+","+heightTranslate);
              svgCanvas.append(img);
          }
      );
  },

  _displayAllOrganismParts: function(svg) {
      if (svg) {  // Sometimes svg is null... why?
          this.props.allSvgPathIds.forEach(function(svgPathId) {
              this._displayOrganismPartsWithDefaultProperties(svg, svgPathId);
          }, this);
      }
  },

  _hoveredRowContainsPathId: function(svgPathId) {
      if (!this.state.hoveredRowId) {
          return false;
      }
      return (this.props.expressedFactorsPerRow.hasOwnProperty(this.state.hoveredRowId) && this.props.expressedFactorsPerRow[this.state.hoveredRowId].indexOf(svgPathId) > -1);
  },

  _displayOrganismPartsWithDefaultProperties: function(svg, svgPathId) {

      var colour = this.props.expressedTissueColour;
      if (this.state.hoveredPathId === svgPathId || this._hoveredRowContainsPathId(svgPathId))  {
          colour = this.props.hoveredTissueColour;
      }

      if (this.props.expressedFactors.indexOf(svgPathId) > -1) {
          this._highlightOrganismParts(svg, svgPathId, colour, 0.7);
      } else {
          this._highlightOrganismParts(svg, svgPathId, "gray", 0.5);
      }
  },

  _highlightOrganismParts: function(svg, svgPathId, colour, opacity) {
      AnatomogramImage._recursivelyChangeProperties(svg.select("#" + svgPathId), colour, opacity);
  },

  _registerHoverEvents: function(svg) {
      if (svg) {  // Sometimes svg is null... why?

          var eventEmitter = this.props.eventEmitter,
              hoverColour = this.props.hoveredTissueColour,
              highlightOrganismPartsCallback = this._highlightOrganismParts,
              displayOrganismPartsWithDefaultPropertiesCallback = this._displayOrganismPartsWithDefaultProperties;
          var mouseoverCallback = function(svgPathId) {
              highlightOrganismPartsCallback(svg, svgPathId, hoverColour, 0.7);
              eventEmitter.emit('gxaAnatomogramTissueMouseEnter', svgPathId);
          };
          var mouseoutCallback = function(svgPathId) {
              displayOrganismPartsWithDefaultPropertiesCallback(svg, svgPathId);
              eventEmitter.emit('gxaAnatomogramTissueMouseLeave', svgPathId);
          };

          this.props.allSvgPathIds.forEach(function(svgPathId) {
              var svgElement = svg.select("#" + svgPathId);
              if (svgElement) {
                  svgElement.mouseover(function() {mouseoverCallback(svgPathId)});
                  svgElement.mouseout(function() {mouseoutCallback(svgPathId)});
              }
          }, this);
      }
  },

  statics: {
      _recursivelyChangeProperties: function(svgElement, colour, opacity) {

          if (svgElement) {
              var innerElements = svgElement.selectAll("*");

              if (innerElements.length > 0) {
                  innerElements.forEach(function(innerElement) {
                      AnatomogramImage._recursivelyChangeProperties(innerElement);
                  });
              }

              svgElement.attr({"fill": colour, "fill-opacity": opacity});
          }
      },

      _recursivelySelectElements: function(svgElement) {
          if (!svgElement) {
              return [];
          }

          var innerElements = svgElement.selectAll("*");
          if (innerElements.length === 0) {
              return [svgElement];
          } else {
              var allElements = [];
              innerElements.forEach(function(innerElement) {
                  allElements = allElements.concat(AnatomogramImage._recursivelySelectElements(innerElement));
              });
              return allElements;
          }
      }
  }
});



var Anatomogram = React.createClass({

    propTypes: {
        anatomogramData: React.PropTypes.object.isRequired,
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

    getInitialState: function() {

        var availableAnatomograms = [];
        if (this.props.anatomogramData.maleAnatomogramFile) {
            availableAnatomograms.push(
                {id: "male",
                 anatomogramFile: this.props.atlasBaseURL + "/resources/svg/" + this.props.anatomogramData.maleAnatomogramFile,
                 toggleSrcTemplate: this.props.atlasBaseURL + this.props.anatomogramData.toggleButtonMaleImageTemplate}
            );
        }
        if (this.props.anatomogramData.femaleAnatomogramFile) {
            availableAnatomograms.push(
                {id: "female",
                 anatomogramFile: this.props.atlasBaseURL + "/resources/svg/" + this.props.anatomogramData.femaleAnatomogramFile,
                 toggleSrcTemplate: this.props.atlasBaseURL + this.props.anatomogramData.toggleButtonFemaleImageTemplate}
            );
        }
        if (this.props.anatomogramData.brainAnatomogramFile) {
            availableAnatomograms.push(
                {id: "brain",
                 anatomogramFile: this.props.atlasBaseURL + "/resources/svg/" + this.props.anatomogramData.brainAnatomogramFile,
                 toggleSrcTemplate: this.props.atlasBaseURL + this.props.anatomogramData.toggleButtonBrainImageTemplate}
            );
        }


        var allExpressedFactors = [],
            expressedFactorsPerRow = {};
        this.props.profileRows.forEach(function(profileRow) {
            var expressedFactors = [];
            profileRow.expressions.forEach(function(expression) {
                if (! typeof expression.value !== "undefined" && expression.value) {
                    expressedFactors.push(expression.svgPathId);
                }
            });
            expressedFactorsPerRow[profileRow.name] = expressedFactors;
            allExpressedFactors = allExpressedFactors.concat(expressedFactors);
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        return {
            selectedId: availableAnatomograms[0].id,
            availableAnatomograms: availableAnatomograms,
            expressedFactors: allExpressedFactors.filter(onlyUnique),
            expressedFactorsPerRow: expressedFactorsPerRow
        }
    },

    render: function () {
        function containsHuman(str) {
            return str.indexOf("human") > -1;
        }

        return (
            <div className="gxaAnatomogram" style={{display: "table", paddingTop: "4px"}}>
                <div style={{display: "table-row"}}>
                    <div style={{display: "table-cell", verticalAlign: "top"}}>
                        <AnatomogramSelectImageButtons selectedId={this.state.selectedId} availableAnatomograms={this.state.availableAnatomograms} onClick={this._handleChange}/>
                    </div>
                    <AnatomogramImage
                      ref="currentImage"
                      file={this._getAnatomogramSVGFile(this.state.selectedId)}
                      height={containsHuman(this.props.anatomogramData.maleAnatomogramFile) ? "375" : "265"}
                      expressedFactors={this.state.expressedFactors}
                      expressedFactorsPerRow={this.state.expressedFactorsPerRow}
                      allSvgPathIds={this.props.anatomogramData.allSvgPathIds}
                      eventEmitter={this.props.eventEmitter}
                      expressedTissueColour={this.props.expressedTissueColour}
                      hoveredTissueColour={this.props.hoveredTissueColour}/>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        this.props.eventEmitter.addListener("gxaHeatmapColumnHoverChange", this._highlightPath);
        this.props.eventEmitter.addListener("gxaHeatmapRowHoverChange", this._highlightRow);
    },

    _handleChange: function(newSelectedId) {
        if (newSelectedId !== this.state.selectedId) {
            this.setState({selectedId: newSelectedId});
        }
    },

    _highlightPath: function(svgPathId) {
        this.refs.currentImage._highlightPath(svgPathId);
    },

    _highlightRow: function(rowId) {
      this.refs.currentImage._highlightRow(rowId);
    },

    _getAnatomogramSVGFile: function(id) {
        for (var i = 0 ; i < this.state.availableAnatomograms.length ; i++) {
            if (id === this.state.availableAnatomograms[i].id) {
                return this.state.availableAnatomograms[i].anatomogramFile;
            }
        }
    }

});

//*------------------------------------------------------------------*

module.exports = Anatomogram;
