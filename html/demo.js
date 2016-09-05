"use strict";

//*------------------------------------------------------------------*

var React = require('react');
var ReactDOM = require('react-dom');

//*------------------------------------------------------------------*


//*------------------------------------------------------------------*

module.exports = function(mountNode) {
  ReactDOM.render(
      React.createElement(require('./Demo.jsx'), {}
      ), mountNode
  );
};
