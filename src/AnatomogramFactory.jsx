"use strict";
//*------------------------------------------------------------------*

var React = require('react');
var EventEmitter = require('events');
var validate = require('react-prop-types-check');

var Anatomogram = require('./Anatomogram.jsx');
var imagesAvailableForSpecies = require('./imagesAvailable.js');

//*------------------------------------------------------------------*

var argumentShape= {
      pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
      anatomogramData: React.PropTypes.shape({
        species: React.PropTypes.string.isRequired,
        allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
        /** There may also be other properties sent for compatibility with the older widget.*/
      }).isRequired,
      expressedTissueColour: React.PropTypes.string.isRequired,
      hoveredTissueColour: React.PropTypes.string.isRequired,
      eventEmitter: React.PropTypes.instanceOf(EventEmitter),
      atlasBaseURL: React.PropTypes.string.isRequired
  };

var _availableAnatomograms= function(species,pathToFolderWithBundledResources) {
  var result = [];
  var o = imagesAvailableForSpecies(species);
  for(var anatomogramType in o){
    if(o.hasOwnProperty(anatomogramType)&& o[anatomogramType]){
      result.push({
        type:anatomogramType,
        anatomogramFile: pathToFolderWithBundledResources+"/"+o[anatomogramType],
      })
    }
  }
  return result;
};

var callEmitterWhenMousedOverTissuesChange = function(eventEmitter){
  var forEachXNotInYsEmit = function(xs, ys, eventName){
    xs
    .filter(function(id){
      return ys.indexOf(id)>-1;
    })
    .forEach(function(id){
      eventEmitter.emit(eventName, id);
    });
  }
  return function emitEvents(nextIds,previousIds){
    forEachXNotInYsEmit(nextIds, previousIds, 'gxaAnatomogramTissueMouseEnter');
    forEachXNotInYsEmit(previousIds,nextIds, 'gxaAnatomogramTissueMouseLeave');
  }
};

var create = function(args){
  validate(args,argumentShape);
  var availableAnatomograms= _availableAnatomograms(args.anatomogramData.species, args.pathToFolderWithBundledResources);
  return(
    availableAnatomograms.length
      ? <Anatomogram
          pathToFolderWithBundledResources={args.pathToFolderWithBundledResources}
          expressedTissueColour={args.expressedTissueColour}
          hoveredTissueColour={args.hoveredTissueColour}
          availableAnatomograms= {availableAnatomograms}
          height={args.anatomogramData.species.indexOf("homo sapiens")>-1 ? 375 : 265}
          whenMousedOverIdsChange={
            args.whenMousedOverIdsChange
            || (
              args.eventEmitter
              ? callEmitterWhenMousedOverTissuesChange(args.eventEmitter)
              : function(){}
            )}
          allSvgPathIds={args.anatomogramData.allSvgPathIds}
          idsExpressedInExperiment={args.idsExpressedInExperiment||[]}
          idsToBeHighlighted={args.idsToBeHighlighted||[]}/>
      : null
  );
}





//*------------------------------------------------------------------*
module.exports={"create": create};
