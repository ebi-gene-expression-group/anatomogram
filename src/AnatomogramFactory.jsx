"use strict";
//*------------------------------------------------------------------*

var React = require('react');
var EventEmitter = require('events');
var validate = require('react-prop-types-check')

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
  };

var _expressedFactorsPerRow = function(profileRows){
  return (
    profileRows
    .reduce(function(result,row){
      result[row.name] =
        row.expressions.filter(function(expression){
          return expression.value;
        })
        .map(function(expression){
          return expression.svgPathId
        });
      return result;
    },{})
  );
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

var create = function(args){
  validate(args,argumentShape);
  var availableAnatomograms= _availableAnatomograms(args.anatomogramData.species, args.pathToFolderWithBundledResources);
  return(
    availableAnatomograms.length
      ? <Anatomogram
          pathToFolderWithBundledResources={args.pathToFolderWithBundledResources}
          expressedTissueColour={args.expressedTissueColour}
          hoveredTissueColour={args.hoveredTissueColour}
          expressedFactorsPerRow={_expressedFactorsPerRow(args.profileRows)}
          availableAnatomograms= {availableAnatomograms}
          height={args.anatomogramData.species.indexOf("homo sapiens")>-1 ? 375 : 265}
          eventEmitter={args.eventEmitter}
          allSvgPathIds={args.anatomogramData.allSvgPathIds}  />
      : null
  );
}





//*------------------------------------------------------------------*
module.exports={"create": create};
