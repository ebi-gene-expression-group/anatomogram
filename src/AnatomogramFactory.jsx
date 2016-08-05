/**
<Anatomogram
  pathToFolderWithBundledResources={this.props.pathToFolderWithBundledResources}
  anatomogramData={this.props.anatomogram}
  expressedTissueColour={anatomogramExpressedTissueColour} hoveredTissueColour={anatomogramHoveredTissueColour}
  profileRows={this.props.profiles.rows} eventEmitter={this.props.anatomogramEventEmitter} atlasBaseURL={this.props.atlasBaseURL} />
*/

//*------------------------------------------------------------------*

var React = require('react');
var EventEmitter = require('events');
var validate = require('react-prop-types-check')

var Anatomogram = require('./Anatomogram.jsx');

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

var create = function(args){
  validate(args,argumentShape);
  return(
    <Anatomogram {...args} />
  );
}





//*------------------------------------------------------------------*
module.exports={"create": create};
