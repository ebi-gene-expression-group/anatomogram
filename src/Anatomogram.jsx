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

var AnatomogramImageParts = React.createClass({
  propTypes: {
    idsExpressedInExperiment: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    idsHeatmapWantsHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    idsMousedOver: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    idsNotHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    expressedTissueColour: React.PropTypes.string.isRequired,
    hoveredTissueColour: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {toDraw: [].concat(
      AnatomogramImageParts.idsThatShouldBeStronglyHighlighted(this.props)
        .map(this._highlightStrongly)
      ,
      this.props.idsExpressedInExperiment
        .map(this._highlightSlightly)
      ,
      this.props.idsNotHighlighted
        .map(this._highlightAsBackground)
      )};
  },

  render: function() {
    return <span/>;
  },

  _highlightStrongly: function(svgPathId) {
    return {id: svgPathId, colour: this.props.hoveredTissueColour, opacity: 0.7 };
  },

  _highlightSlightly: function(svgPathId) {
    return {id: svgPathId, colour: this.props.expressedTissueColour, opacity: 0.7 };
  },

  _highlightAsBackground: function(svgPathId) {
    return {id: svgPathId, colour: "gray", opacity: 0.5 };
  },

  componentWillReceiveProps: function(nextProps) {
    var oldStrong = AnatomogramImageParts.idsThatShouldBeStronglyHighlighted(this.props);
    var newStrong = AnatomogramImageParts.idsThatShouldBeStronglyHighlighted(nextProps);
    var oldWeak = this.props.idsExpressedInExperiment;
    var newWeak = nextProps.idsExpressedInExperiment;

    var toDraw = [].concat(
      //ids that heatmap wants highlighted are the most highlighted
      newStrong
        .filter(function(id){return oldStrong.indexOf(id)<0})
        .map(this._highlightStrongly)
      ,
      //ids that are expressed in the experiment are highlighted with a weaker colour, often the same as background
      newWeak
        .filter(function(id){return newStrong.indexOf(id)<0})
        .filter(function(id){return oldWeak.indexOf(id)<0}.bind(this))
        .map(this._highlightSlightly)
      ,
      nextProps.idsNotHighlighted
        .filter(function(id){return this.props.idsNotHighlighted.indexOf(id)<0}.bind(this))
        .map(this._highlightAsBackground)
      );

    this.setState({toDraw:toDraw});
  },

  statics: {
    idsThatShouldBeStronglyHighlighted(properties){
      return properties.idsHeatmapWantsHighlighted.concat(properties.idsMousedOver);
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
      hoveredRowId: null,
      mousedOverSvgIds: []
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this._loadAnatomogram(nextProps.file);
  },

  componentDidMount: function() {
      this._loadAnatomogram(this.props.file);
      this._draw();
  },

  componentDidUpdate: function(){
    this._draw();
  },

  _draw: function() {
    var svg= Snap(ReactDOM.findDOMNode(this.refs.anatomogram)).select("g");
    if(svg!==null){
      this._drawOnSvg(svg,this.refs.imageParts.state.toDraw);
      this.refs.imageParts.setState({toDraw:[]});
    }
  },
  _drawInitialLayout: function(svg){
    this._drawOnSvg(svg,this.refs.imageParts.getInitialState().toDraw);
    this.refs.imageParts.setState({toDraw:[]});
  },

  _drawOnSvg: function(svg, instructions){
    instructions.forEach(function(instruction){
      this._highlightOrganismParts(svg,instruction.id, instruction.colour, instruction.opacity);
    }.bind(this));
  },

  render: function () {
    var idsExpressedInExperiment =[],
        idsHoveredOver=[],
        idsHeatmapWantsHighlighted = [],
        idsNotHighlighted = [];
    for(var i = 0 ; i< this.props.allSvgPathIds.length; i++){
      var id = this.props.allSvgPathIds[i];
      if(this.state.mousedOverSvgIds.indexOf(id)>-1){
        idsHoveredOver.push(id);
      } else if(this._hoveredRowContainsPathId(id) || this.state.hoveredPathId === id){
        idsHeatmapWantsHighlighted.push(id);
      } else if(this.props.expressedFactors.indexOf(id)>-1){
        idsExpressedInExperiment.push(id);
      } else {
        idsNotHighlighted.push(id);
      }
    }

    return (<span>
        <svg ref="anatomogram" style={{display: "table-cell", width: "230px", height:this.props.height + "px"}} />
        <AnatomogramImageParts ref="imageParts" key={this.props.file}
            idsExpressedInExperiment={idsExpressedInExperiment}
            idsHeatmapWantsHighlighted={idsHeatmapWantsHighlighted}
            idsMousedOver={idsHoveredOver}
            idsNotHighlighted={idsNotHighlighted}
            expressedTissueColour={this.props.expressedTissueColour}
            hoveredTissueColour={this.props.hoveredTissueColour}/>
      </span>);
  },

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

      var displayAllOrganismPartsCallback = this._drawInitialLayout;
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

  _hoveredRowContainsPathId: function(svgPathId) {
    return (this.state.hoveredRowId
            && this.props.expressedFactorsPerRow.hasOwnProperty(this.state.hoveredRowId)
            && this.props.expressedFactorsPerRow[this.state.hoveredRowId].indexOf(svgPathId) > -1 );
  },

  _registerHoverEvents: function(svg) {
      if (svg) {  // Sometimes svg is null... why?
          var mouseoverCallback = function(svgPathId) {
              this.props.eventEmitter.emit('gxaAnatomogramTissueMouseEnter', svgPathId);
              this.setState(function(previousState, currentProps){
                  var a = [].concat(previousState.mousedOverSvgIds);
                  a.push(svgPathId);
                  while(a.length >5){
                    a.shift();
                  }
                  return {mousedOverSvgIds: a};
              });
          }.bind(this);
          var mouseoutCallback = function(svgPathId) {
              this.props.eventEmitter.emit('gxaAnatomogramTissueMouseLeave', svgPathId);
              this.setState(function(previousState, currentProps){
                  var a = previousState.mousedOverSvgIds.map(
                      function(el){return el===svgPathId ? "" : el}
                    );
                  return {mousedOverSvgIds: a};
                });
          }.bind(this);

          this.props.allSvgPathIds.forEach(function(svgPathId) {
              var svgElement = svg.select("#" + svgPathId);
              if (svgElement) {
                  svgElement.mouseover(function() {mouseoverCallback(svgPathId)});
                  svgElement.mouseout(function() {mouseoutCallback(svgPathId)});
              }
          }, this);
      }
  },

  _highlightOrganismParts: function(svg, svgPathId, colour, opacity) {
      AnatomogramImage._recursivelyChangeProperties(svg.select("#" + svgPathId), colour, opacity);
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
                      key={this.state.selectedId}
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
