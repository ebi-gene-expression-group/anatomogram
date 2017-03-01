import React from 'react';
import Anatomogram from './Anatomogram.jsx';
import {getSvgsForSpecies} from './imagesAvailable.js';
import './ContainerLayout.less';

// See note below, consider using something like https://flowtype.org if type checking is necessary
// const argumentShape= {
//     pathToFolderWithBundledResources: RequiredString,
//     anatomogramData: React.PropTypes.shape({
//         species: RequiredString,
//         allSvgPathIds: React.PropTypes.arrayOf(RequiredString) //if not provided, we use properties read in from the file
//     }).isRequired,
//     expressedTissueColour: RequiredString,
//     hoveredTissueColour: RequiredString,
//     eventEmitter: React.PropTypes.instanceOf(EventEmitter)
// };

const _availableAnatomograms = (species, pathToResources, allSvgPathIds) =>
    getSvgsForSpecies(pathToResources, species)
    .filter(e => !allSvgPathIds || allSvgPathIds.some(id => e.ids.includes(id)));

const callEmitterWhenMousedOverTissuesChange = (eventEmitter) => {
    const forEachXNotInYsEmit = (xs, ys, eventName) => {
        xs
        .filter(id => ys.indexOf(id) === -1)
        .forEach(id => {eventEmitter.emit(eventName, id);});
    };

    return function emitEvents(nextIds,previousIds){
        forEachXNotInYsEmit(nextIds, previousIds, 'gxaAnatomogramTissueMouseEnter');
        forEachXNotInYsEmit(previousIds,nextIds, 'gxaAnatomogramTissueMouseLeave');
    }
};

const createAnatomogram = (args) => {
    // PropTypes should only be used with proper React components
    // https://facebook.github.io/react/warnings/dont-call-proptypes.html
    // validate(argumentShape, args, "Error!");

    const availableAnatomograms =
        _availableAnatomograms(
            args.anatomogramData.species,
            args.pathToResources,
            args.anatomogramData.allSvgPathIds);

    return(
        availableAnatomograms.length ?
            <Anatomogram
                pathToResources={args.pathToResources}
                expressedTissueColour={args.expressedTissueColour}
                hoveredTissueColour={args.hoveredTissueColour}
                availableAnatomograms= {availableAnatomograms}
                height={args.anatomogramData.species.indexOf("homo sapiens")>-1 ? 375 : 265}
                whenMousedOverIdsChange={
                    args.whenMousedOverIdsChange ||
                    (args.eventEmitter ? callEmitterWhenMousedOverTissuesChange(args.eventEmitter) : function(){}
                )}
                idsExpressedInExperiment={args.idsExpressedInExperiment || args.ontologyIdsForTissuesExpressedInAllRows || []}
                idsToBeHighlighted={args.idsToBeHighlighted||[]}
                {...(args.anatomogramData.allSvgPathIds? {allSvgPathIds:args.anatomogramData.allSvgPathIds} :{})}/> :
            null
    );
};

//http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (let i = 0 ; i < a.length ; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

const makeWrapper = (ComponentClass) => {
    return (
        React.createClass({
            displayName: "WrappedComponent",
            propTypes: {
                ontologyIdsToHighlight: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
                onOntologyIdIsUnderFocus: React.PropTypes.func.isRequired,
                componentProps: React.PropTypes.object.isRequired
            },

        shouldComponentUpdate(nextProps) {
            return !arraysEqual(nextProps.ontologyIdsToHighlight, this.props.ontologyIdsToHighlight) ;
        },

        render() {
            return (
                <div id="gxaAnatomogramWrapper">
                    <ComponentClass ontologyIdsToHighlight={this.props.ontologyIdsToHighlight}
                                    onOntologyIdIsUnderFocus={this.props.onOntologyIdIsUnderFocus}
                                    {...this.props.componentProps} />
                </div>
            );
        }
    })
  );
};

/**
anatomogramConfig: see argumentShape
componentClass : a React class to be wrapped. Should accept props onOntologyIdIsUnderFocus and ontologyIdsToHighlight
componentProps : other props to be passed over.
*/
const wrapComponentWithAnatomogram = (anatomogramConfig, componentClass, componentProps) => {
    const Wrapped = makeWrapper(componentClass);

    return React.createClass({
        displayName: "AnatomogramComponentWrapper",

        getInitialState() {
            return {
                ontologyIdsForComponentContentUnderFocus: [],
                ontologyIdsForAnatomogramContentUnderFocus: []
            }
        },

        render() {
            return (
                <div>
                    <div id="gxaAnatomogramAside">
                        {createAnatomogram(
                            Object.assign({},
                                anatomogramConfig,
                                {
                                    idsToBeHighlighted: this.state.ontologyIdsForComponentContentUnderFocus,
                                    whenMousedOverIdsChange: nextIds => {
                                        this.setState({ontologyIdsForAnatomogramContentUnderFocus: nextIds});
                                    }
                                })
                        )}
                    </div>

                    <Wrapped componentProps={componentProps}
                             onOntologyIdIsUnderFocus={selectedIdOrIds => {
                                 this.setState({
                                     ontologyIdsForComponentContentUnderFocus:
                                        selectedIdOrIds ?
                                            (typeof selectedIdOrIds === 'string' ? [selectedIdOrIds] : selectedIdOrIds) :
                                            []})
                             }}
                             ontologyIdsToHighlight={this.state.ontologyIdsForAnatomogramContentUnderFocus}/>
                </div>
            )
        }
    })
};

export default {
    create: createAnatomogram, wrapComponent:
    wrapComponentWithAnatomogram
};

