"use strict";

//*------------------------------------------------------------------*

var React = require('react');
var ReactDOM = require('react-dom');

//*------------------------------------------------------------------*

var SelectionIcon = require('../src/SelectionIcon.jsx');

var EventEmitter = require('events');

//*------------------------------------------------------------------*

module.exports = function(anatomogramType,selected, mountNode) {
    ReactDOM.render(
        React.createElement(SelectionIcon, {
            anatomogramType: anatomogramType,
            selected: selected
        }), mountNode
    );
};
