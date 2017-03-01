import React from 'react';
import ReactDOM from 'react-dom';
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

//http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
const ArraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

const AnatomogramImageParts = React.createClass({
    propTypes: {
        idsExpressedInExperiment: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        idsHeatmapWantsHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        idsMousedOver: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        idsNotHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        expressedTissueColour: React.PropTypes.string.isRequired,
        hoveredTissueColour: React.PropTypes.string.isRequired,
        whenMousedOverIdsChange: React.PropTypes.func
    },

    getDefaultProps() {
        return ({ whenMousedOverIdsChange: (nextIds, oldIds) => {} });
    },

    getInitialState() {
        return {
            toDraw: [].concat(
                this._idsThatShouldBeStronglyHighlighted(this.props).map(this._highlightStrongly),
                this.props.idsExpressedInExperiment.map(this._highlightSlightly),
                this.props.idsNotHighlighted.map(this._highlightAsBackground)
            )};
    },

    render() {
        return <span/>;
    },

    _highlightStrongly(svgPathId) {
        return { id: svgPathId, colour: this.props.hoveredTissueColour, opacity: 0.7 };
    },

    _highlightSlightly(svgPathId) {
        return { id: svgPathId, colour: this.props.expressedTissueColour, opacity: 0.5 };
    },

    _highlightAsBackground(svgPathId) {
        return { id: svgPathId, colour: `gray`, opacity: 0.5 };
    },

    componentWillUnmount() {
        this.props.whenMousedOverIdsChange([],this.props.idsMousedOver);
    },

    componentWillReceiveProps(nextProps) {
        if(!ArraysEqual(nextProps.idsMousedOver, this.props.idsMousedOver)){
            this.props.whenMousedOverIdsChange(nextProps.idsMousedOver,this.props.idsMousedOver);
        }
        const oldStrong = this._idsThatShouldBeStronglyHighlighted(this.props);
        const newStrong = this._idsThatShouldBeStronglyHighlighted(nextProps);
        const oldWeak = this.props.idsExpressedInExperiment;
        const newWeak = nextProps.idsExpressedInExperiment;

        const toDraw = [].concat(
            //ids that heatmap wants highlighted are the most highlighted
            newStrong
            .filter(id => !oldStrong.includes(id))
            .map(this._highlightStrongly),
            //ids that are expressed in the experiment are highlighted with a weaker colour, often the same as background
            newWeak
            .filter(id => !newStrong.includes(id))
            .filter(id => !oldWeak.includes(id))
            .map(this._highlightSlightly),
            nextProps.idsNotHighlighted
            .filter(id => !this.props.idsNotHighlighted.includes(id))
            .map(this._highlightAsBackground)
        );

        this.setState({ toDraw: toDraw });
    },

    _idsThatShouldBeStronglyHighlighted(properties) {
        return properties.idsHeatmapWantsHighlighted.concat(properties.idsMousedOver);
    }
});


const AnatomogramImage = React.createClass({
    propTypes: {
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
    },

    getInitialState() {
        return { mousedOverSvgIds: [] };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.file!==this.props.file) {
            this._loadAnatomogram(nextProps.file);
        }
    },

    componentDidMount() {
        this._loadAnatomogram(this.props.file);
        this._draw();
    },

    componentDidUpdate() {
        this._draw();
    },

    _draw() {
        const svg = Snap(ReactDOM.findDOMNode(this._anatomogram)).select(`#LAYER_EFO`);
        if(svg !== null){
            this._drawOnSvg(svg, this._imageParts.state.toDraw);
            this._imageParts.setState({ toDraw: [] });
        }
    },

    _drawInitialLayout(svg) {
        if(this._imageParts) {
            this._drawOnSvg(svg, this._imageParts.getInitialState().toDraw);
            this._imageParts.setState({ toDraw: [] });
        }
    },

    _drawOnSvg(svg, instructions) {
        instructions.forEach(instruction => {
            this._highlightOrganismParts(svg,instruction.id, instruction.colour, instruction.opacity);
        });
    },

    render () {
        let idsExpressedInExperiment = [],
            idsHoveredOver = [],
            idsHeatmapWantsHighlighted = [],
            idsNotHighlighted = [];

        this.props.allSvgPathIds.forEach(id => {
            if (this.state.mousedOverSvgIds.includes(id)) {
                idsHoveredOver.push(id);
            } else if (this.props.idsToBeHighlighted.includes(id)) {
                idsHeatmapWantsHighlighted.push(id);
            } else if (this.props.idsExpressedInExperiment.includes(id)) {
                idsExpressedInExperiment.push(id);
            } else {
                idsNotHighlighted.push(id);
            }
        });

    return (
        <span>
            <svg ref={c => this._anatomogram = c} style={{display: "table-cell", width: "230px", height:this.props.height + "px"}} />

            <AnatomogramImageParts
                ref={c => this._imageParts = c} key={this.props.file}
                idsExpressedInExperiment={idsExpressedInExperiment}
                idsHeatmapWantsHighlighted={idsHeatmapWantsHighlighted}
                idsMousedOver={idsHoveredOver}
                idsNotHighlighted={idsNotHighlighted}
                expressedTissueColour={this.props.expressedTissueColour}
                hoveredTissueColour={this.props.hoveredTissueColour}
                whenMousedOverIdsChange={this.props.whenMousedOverIdsChange}
            />
        </span>);
    },

    _highlightPath(svgPathId) {
        this.setState({ hoveredPathId: svgPathId });
    },

    _loadAnatomogram(svgFile) {
        let svgCanvas = Snap(ReactDOM.findDOMNode(this._anatomogram)),
            allElements = svgCanvas.selectAll(`*`);

        if (allElements) {
            allElements.remove();
        }

        const displayAllOrganismPartsCallback = this._drawInitialLayout;
        const registerHoverEventsCallback = this._registerHoverEvents;

        Snap.load(
            svgFile,
            fragment => {
                displayAllOrganismPartsCallback(fragment.select(`#LAYER_EFO`));
                registerHoverEventsCallback(fragment.select(`#LAYER_EFO`));
                fragment.selectAll(`svg > g`).forEach(g => {
                    g.transform(`S1.6,0,0`);
                    svgCanvas.append(g);
                });
                const img = fragment.select(`#ccLogo`);
                if (img) {
                    // svgCanvas.node.clientHeight and svgCanvas.node.clientWidth is more “correct” but are 0 in Firefox
                    const heightTranslate = Number.parseInt(this._anatomogram.style.height) - 15;
                    const widthTranslate = Number.parseInt(this._anatomogram.style.width) / 2 - 40;
                    img.transform(`t${widthTranslate},${heightTranslate}`);
                    svgCanvas.append(img);
                }
            }
        );
    },

    _registerHoverEvents(svg) {
        if (svg) {  // Sometimes svg is null... why?
            const MaxOverlappingTissues = 5;
            const mouseoverCallback = svgPathId => {
                this.setState((previousState) =>
                    ({ mousedOverSvgIds: [...previousState.mousedOverSvgIds, svgPathId].slice(-MaxOverlappingTissues) })
                );
            };

            const mouseoutCallback = svgPathId => {
                this.setState((previousState) =>
                    ({ mousedOverSvgIds: previousState.mousedOverSvgIds.map(el => el === svgPathId ? `` : el) })
                );
            };

            const attachCallbacks = (svgElement, svgPathId) => {
                if (svgElement) {
                    svgElement.mouseover(() => { mouseoverCallback(svgPathId) });
                    svgElement.mouseout(() => { mouseoutCallback(svgPathId) });
                }
            };

            this.props.allSvgPathIds.forEach(svgPathId => {
                const svgElement = svg.select(`#${svgPathId}`);
                attachCallbacks(svgElement, svgPathId);
                if(svgElement && svgElement.type === `use`){
                    attachCallbacks(svg.select(svgElement.node.getAttribute(`xlink:href`)), svgPathId);
                }
            });
        }
    },

    _highlightOrganismParts(svg, svgPathId, colour, opacity) {
        let el = svg.select(`#${svgPathId}`);
        if (el && el.type === `use`) {
            this._recursivelyChangeProperties(svg.select(el.node.getAttribute(`xlink:href`)), colour, opacity);
        }
        this._recursivelyChangeProperties(el, colour, opacity);
    },

    _recursivelyChangeProperties(svgElement, colour, opacity) {
        if (svgElement) {
            svgElement.selectAll(`*`).forEach(innerElement => { this._recursivelyChangeProperties(innerElement); });
            svgElement.attr({"fill": colour, "fill-opacity": opacity});
        }
    }
});

export default AnatomogramImage;
