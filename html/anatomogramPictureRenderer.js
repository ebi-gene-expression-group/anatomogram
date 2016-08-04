"use strict";

//*------------------------------------------------------------------*

var React = require('react');
var ReactDOM = require('react-dom');

//*------------------------------------------------------------------*

var svgsForSpecies = require('../src/imagesAvailable.js');

var EventEmitter = require('events');

//*------------------------------------------------------------------*

module.exports = function(mountNode) {
  var allSpecies = ["homo sapiens", "mus musculus", "gallus gallus", "bos taurus", "rattus norvegicus", "anolis carolinensis", "xenopus tropicalis", "tetraodon nigrovirdis", "macaca mulatta", "monodelphis domestica", "papio anubis", "oryza sativa japonica group", "oryza sativa", "hordeum vulgare subsp. vulgare", "hordeum vulgare", "zea mays", "sorghum bicolor", "arabidopsis thaliana", "solanum lycopersicum", "brachypodium distachyon"];

  var picturesForSvgs= function(name, path){
    return (
      React.createElement('div',{},[
        React.createElement('span',{key:name},name),
        React.createElement('img',{
          key:path,
          src: path
        })])
    );
  }
  var picturesForSpecies = function(speciesName, values){
    return (
      React.createElement('div',{},
        [React.createElement('div',{key:speciesName,style:{marginTop:"100px",fontSize:"32px"}},speciesName)].concat([].concat.apply(
          Object.keys(values).map(function(name){
            return picturesForSvgs(name, values[name]);
          })
        ))
      )
    );
  };

  var children = allSpecies.map(function(speciesName){
    return picturesForSpecies(speciesName, svgsForSpecies(speciesName));
    }
  );
  ReactDOM.render(
      React.createElement('div', {}, children
      ), mountNode
  );
};
