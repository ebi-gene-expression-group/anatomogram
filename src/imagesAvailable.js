"use strict";
//*------------------------------------------------------------------*

var svgsForSpecies = require('../assets/json/svgsForSpecies.json');

//*------------------------------------------------------------------*

//Using Ensembl and Ensembl Plants species


var _anatomogramFile = function(path){
  return require('../assets/svg/'+path);
}

var getSvgsForSpecies = function(species){
  var v = svgsForSpecies[species];
  var result = {};
  if(typeof v === 'object'){
    for(var anatomomogramType in v){
      if(v.hasOwnProperty(anatomomogramType)){
        result[anatomomogramType] = _anatomogramFile(v[anatomomogramType]);
      }
    }
  } else if (typeof v === 'string'){
    result["svg"] = _anatomogramFile(v);
  }
  return result;
}

//*------------------------------------------------------------------*

module.exports = getSvgsForSpecies;
