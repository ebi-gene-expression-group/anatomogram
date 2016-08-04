"use strict";
//*------------------------------------------------------------------*
var React = require('react');
//*------------------------------------------------------------------*

var SelectionIcon = React.createClass({
  propTypes: {
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
      <img ref="toggleButton" onClick={this.props.onClick} src={this._selectionIcon()}
           style={{width: "24px", height: "24px", padding: "2px"}}/>
    )
  },
  _selectionIcon: function(){
    return require("../assets/icons/"+this.props.anatomogramType+"_"+(this.props.selected?"selected":"unselected")+".png");
  }
})

//*------------------------------------------------------------------*

module.exports = SelectionIcon;
