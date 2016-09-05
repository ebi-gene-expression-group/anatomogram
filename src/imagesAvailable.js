"use strict";
//*------------------------------------------------------------------*

var svgsForSpecies = require('../assets/json/svgsForSpecies.json');
var idsForSvgs = require('../assets/json/idsForSvgs.json');

//*------------------------------------------------------------------*

//Using Ensembl and Ensembl Plants species


var _anatomogramFile = function(path,pathToFolderWithBundledResources){
  return pathToFolderWithBundledResources+"/"+require('../assets/svg/'+path);
}

var getSvgsForSpecies = function(species,pathToFolderWithBundledResources){
  var v = svgsForSpecies[species];
  var result = [];
  if(typeof v === 'object'){
    for(var anatomomogramType in v){
      if(v.hasOwnProperty(anatomomogramType)){
        result.push({
          type:anatomomogramType,
          path:_anatomogramFile(v[anatomomogramType],pathToFolderWithBundledResources),
          ids: idsForSvgs[v[anatomomogramType]]
        });
      }
    }
  } else if (typeof v === 'string'){
    result.push({
      type:"svg",
      path:_anatomogramFile(v,pathToFolderWithBundledResources),
      ids: idsForSvgs[v]
    });
  }
  return result;
}

//*------------------------------------------------------------------*

module.exports = getSvgsForSpecies;
