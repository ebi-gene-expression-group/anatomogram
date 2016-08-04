"use strict";
//*------------------------------------------------------------------*
var React = require('react');
var ReactDOM = require('react-dom');

var $ = require('jquery');
require('jquery-hc-sticky');
require('jquery-ui-bundle');

require('!style!css!less!./SelectionIcon.less');

//*------------------------------------------------------------------*

var SelectionIcon = React.createClass({
  propTypes: {
    pathToFolderWithBundledResources:React.PropTypes.string.isRequired,
    anatomogramType: function(props, propName,componentName){
      if(propName === "anatomogramType"){
        if(["brain","female","male","whole_plant","flower_parts"].indexOf(props[propName])<0){
          return new Error("Unknown type of anatomogram: "+props[propName]);
        }
      }
      return "";
    },
    selected: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  render: function(){
    return (
      <div>
      <span>Jquery on</span>
      <img ref="toggleButton" onClick={this.props.onClick} src={this._selectionIcon()}
           style={{width: "24px", height: "24px", padding: "2px"}}/>
      <span>Jquery off</span>
      <img className={"selection-icon"} onClick={this.props.onClick} src={this._selectionIcon()}/>
    </div>
    )
  },
  _selectionIcon: function(){
    return (
      (this.props.pathToFolderWithBundledResources?this.props.pathToFolderWithBundledResources+"/":"")
      + require("../assets/icons/"+this.props.anatomogramType+"_"+(this.props.selected?"selected":"unselected")+".png")
    );
  },
  componentDidMount: function() {
      $(ReactDOM.findDOMNode(this.refs.toggleButton)).button();
  }
});

//*------------------------------------------------------------------*

module.exports = SelectionIcon;
