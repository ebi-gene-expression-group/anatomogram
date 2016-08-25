"use strict";

//*------------------------------------------------------------------*
var React = require('react');
var ReactDOM = require('react-dom');
var validate = require('react-prop-types-check');
var Snap = require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

//*------------------------------------------------------------------*

//http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
var arraysEqual = function (a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

var AnatomogramImageParts = React.createClass({
  propTypes: {
    idsExpressedInExperiment: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    idsHeatmapWantsHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    idsMousedOver: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    idsNotHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    expressedTissueColour: React.PropTypes.string.isRequired,
    hoveredTissueColour: React.PropTypes.string.isRequired,
    whenMousedOverIdsChange: React.PropTypes.func
  },

  getDefaultProps: function(){
    return ({whenMousedOverIdsChange: function(nextIds,oldIds){}});
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
    if(!arraysEqual(nextProps.idsMousedOver, this.props.idsMousedOver)){
      this.props.whenMousedOverIdsChange(nextProps.idsMousedOver,this.props.idsMousedOver);
    }
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
    height: React.PropTypes.number.isRequired,
    expressedFactorsPerRow: React.PropTypes.object.isRequired,
    allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    expressedTissueColour: React.PropTypes.string.isRequired,
    hoveredTissueColour: React.PropTypes.string.isRequired,
    whenMousedOverIdsChange: React.PropTypes.func
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
              displayAllOrganismPartsCallback(fragment.select("#LAYER_EFO"));
              registerHoverEventsCallback(fragment.select("#LAYER_EFO"));
              fragment.selectAll("svg > g").forEach(function(g){
                g.transform("S1.6,0,0");
                svgCanvas.append(g);
              });
              var img = fragment.select("#ccLogo");
              if(img){
                var heightTranslate = svgCanvas.node.clientHeight - 15;
                var widthTranslate = svgCanvas.node.clientWidth / 2 - 40;
                img.transform("t"+widthTranslate+","+heightTranslate);
                svgCanvas.append(img);
              }
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
//*------------------------------------------------------------------*
module.exports=AnatomogramImage;
