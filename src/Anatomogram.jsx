"use strict";

//*------------------------------------------------------------------*

var React = require('react');
var ReactDOM = require('react-dom');

var imagesAvailableForSpecies = require('./imagesAvailable.js');
var AnatomogramSelectImageButton = require('./SelectionIcon.jsx');

var Snap = require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

var EventEmitter = require('events');

//*------------------------------------------------------------------*

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
    return {id: svgPathId, colour: this.props.expressedTissueColour, opacity: 0.5 };
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
    idsThatShouldBeStronglyHighlighted: function(properties){
      return properties.idsHeatmapWantsHighlighted.concat(properties.idsMousedOver);
    }
  }
});

var AnatomogramImage = React.createClass({
  propTypes: {
    file: function(props, propName,componentName){
      if(propName === "file"){
        if(typeof props[propName]!== "string"){
          return new Error("Expected string to specify file, got: "+props[propName]);
        }
        if(!props[propName]){
          return new Error("Path to file empty!");
        }
      }
      return "";
    },
    height: React.PropTypes.string.isRequired,
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
  _expressedFactors: function(){
    var o = this.props.expressedFactorsPerRow;
    var vs = Object.keys(o).map(function(e){return o[e];});
    return (
      [].concat.apply({},vs)
      .filter(function uniq(e, ix, self) {
          return self.indexOf(e) === ix;
      })
    );
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.file!==this.props.file){
      this._loadAnatomogram(nextProps.file);
    }
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
        idsNotHighlighted = [],
        expressedFactors = this._expressedFactors();

    for(var i = 0 ; i< this.props.allSvgPathIds.length; i++){
      var id = this.props.allSvgPathIds[i];
      if(this.state.mousedOverSvgIds.indexOf(id)>-1){
        idsHoveredOver.push(id);
      } else if(this._hoveredRowContainsPathId(id) || this.state.hoveredPathId === id){
        idsHeatmapWantsHighlighted.push(id);
      } else if(expressedFactors.indexOf(id)>-1){
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
              var heightTranslate = svgCanvas.node.clientHeight - 15;
              var widthTranslate = svgCanvas.node.clientWidth / 2 - 40;
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

          var attachCallbacks = function(svgElement,svgPathId){
            if(svgElement){
              svgElement.mouseover(function() {mouseoverCallback(svgPathId)});
              svgElement.mouseout(function() {mouseoutCallback(svgPathId)});
            }
          }

          this.props.allSvgPathIds.forEach(function(svgPathId) {
            var svgElement = svg.select("#" + svgPathId);
            attachCallbacks(svgElement,svgPathId);
            if(svgElement && svgElement.type === "use"){
              attachCallbacks(svg.select(svgElement.node.getAttribute("xlink:href")),svgPathId);
            }
          }, this);
      }
  },

  _highlightOrganismParts: function(svg, svgPathId, colour, opacity) {
      var el = svg.select("#" + svgPathId);
      if(el && el.type === "use"){
        AnatomogramImage._recursivelyChangeProperties(svg.select(el.node.getAttribute("xlink:href")), colour, opacity);
      }
      AnatomogramImage._recursivelyChangeProperties(el,colour, opacity);
  },

  statics: {
    _recursivelyChangeProperties: function(svgElement, colour, opacity) {
      if (svgElement) {
        svgElement.selectAll("*").forEach(
          function(innerElement) {
            AnatomogramImage._recursivelyChangeProperties(innerElement);
        });
        svgElement.attr({"fill": colour, "fill-opacity": opacity});
      }
    }
  }
});



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
                 <AnatomogramSelectImageButton
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
