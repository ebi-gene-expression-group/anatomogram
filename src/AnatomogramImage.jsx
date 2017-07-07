import React from 'react';
import MaintainedAnatomogram from './MaintainedAnatomogram.jsx'

const AnatomogramImage = ({
    file,
    allSvgPathIds,
    idsExpressedInExperiment,
    idsToBeHighlighted,
    whenMousedOverIdsChange,
    expressedTissueColour,
    hoveredTissueColour,
    height
}) => (
    <MaintainedAnatomogram
        dimensions={{width: 230, height}}
        desiredLayout={{
            prescription: {
                idsPrescribedHighlighted: idsToBeHighlighted,
                idsPrescribedNoticeable: idsExpressedInExperiment,
            },
            allIds: allSvgPathIds,
            colours: {expressedTissueColour, hoveredTissueColour}
        }}
        svgFile={file}
        whenMousedOverIdsChange={whenMousedOverIdsChange}
    />
)

AnatomogramImage.propTypes = {
    file: (props, propName, componentName) => {
        if(propName === `file`){
            if(typeof props[propName]!== `string`){
                return new Error(`Expected string to specify file, got: ${props[propName]}`);
            }
            if(!props[propName]){
                return new Error(`Path to file empty!`);
            }
        }
        return ``;
    },
    height: React.PropTypes.number.isRequired,
    allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    idsExpressedInExperiment: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    idsToBeHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    expressedTissueColour: React.PropTypes.string.isRequired,
    hoveredTissueColour: React.PropTypes.string.isRequired,
    whenMousedOverIdsChange: React.PropTypes.func
}

export default AnatomogramImage;
