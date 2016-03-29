"use strict";

//*------------------------------------------------------------------*

var React = require('react');
var ReactDOM = require('react-dom');

var $ = require('jquery');
require('jquery-hc-sticky');
require('jquery-ui-bundle');

var Snap = require('imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');

var EventEmitter = require('events');

//*------------------------------------------------------------------*

var AnatomogramSelectImageButton = React.createClass({
    propTypes: {
        anatomogramId: React.PropTypes.string.isRequired,
        selected: React.PropTypes.bool.isRequired,
        toggleSrcTemplate: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    render: function() {
        var selectedToggleSrc = this.props.toggleSrcTemplate + "_selected.png",
            unselectedToggleSrc = this.props.toggleSrcTemplate + "_unselected.png";

        return(
            <div>
                <img ref="toggleButton" onClick={this._onClick} src={this.props.selected ? selectedToggleSrc : unselectedToggleSrc}
                     style={{width: "20px", height: "20px", padding: "2px"}}/>
            </div>
        );
    },

    componentDidMount: function() {
        $(ReactDOM.findDOMNode(this.refs.toggleButton)).button();
    },

    _onClick: function() {
        this.props.onClick(this.props.anatomogramId);
    }
});


var AnatomogramSelectImageButtons = React.createClass({
    propTypes: {
        selectedId: React.PropTypes.string.isRequired,
        availableAnatomograms: React.PropTypes.array.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    render: function() {
        if (this.props.availableAnatomograms.length > 1) {
            var selectedId = this.props.selectedId,
                onClick = this.props.onClick;
            var anatomogramSelectImageButtons = this.props.availableAnatomograms.map(function(availableAnatomogram) {
               return(
                   <AnatomogramSelectImageButton key={availableAnatomogram.id + "_toggle"}
                    anatomogramId={availableAnatomogram.id} selected={selectedId === availableAnatomogram.id} toggleSrcTemplate={availableAnatomogram.toggleSrcTemplate} onClick={onClick}/>
               )
            });

            return (
                <span>
                    {anatomogramSelectImageButtons}
                </span>
            );

        } else {
            return (
                null
            )
        }
    }

});


var Anatomogram = React.createClass({
    /*
     E.g. of profileRows:
     {"id":"ENSMUSG00000029019","name":"Nppb","expressions":[{"factorName":"heart","color":"#C0C0C0","value":"152","svgPathId":"UBERON_0000948"},{"factorName":"hippocampus","color":"","value":"","svgPathId":"EFO_0000530"},{"factorName":"liver","color":"","value":"","svgPathId":"UBERON_0002107"},{"factorName":"lung","color":"","value":"","svgPathId":"UBERON_0002048"},{"factorName":"spleen","color":"","value":"","svgPathId":"UBERON_0002106"},{"factorName":"thymus","color":"","value":"","svgPathId":"UBERON_0002370"}]},
     {"id":"ENSMUSG00000027350","name":"Chgb","expressions":[{"factorName":"heart","color":"","value":"","svgPathId":"UBERON_0000948"},{"factorName":"hippocampus","color":"#C0C0C0","value":"148","svgPathId":"EFO_0000530"},{"factorName":"liver","color":"","value":"","svgPathId":"UBERON_0002107"},{"factorName":"lung","color":"","value":"","svgPathId":"UBERON_0002048"},{"factorName":"spleen","color":"","value":"","svgPathId":"UBERON_0002106"},{"factorName":"thymus","color":"","value":"","svgPathId":"UBERON_0002370"}]},
     {"id":"ENSMUSG00000033981","name":"Gria2","expressions":[{"factorName":"heart","color":"","value":"","svgPathId":"UBERON_0000948"},{"factorName":"hippocampus","color":"#C0C0C0","value":"140","svgPathId":"EFO_0000530"},{"factorName":"liver","color":"","value":"","svgPathId":"UBERON_0002107"},{"factorName":"lung","color":"","value":"","svgPathId":"UBERON_0002048"},{"factorName":"spleen","color":"","value":"","svgPathId":"UBERON_0002106"},{"factorName":"thymus","color":"","value":"","svgPathId":"UBERON_0002370"}]},
     {"id":"ENSMUSG00000026368","name":"F13b","expressions":[{"factorName":"heart","color":"","value":"","svgPathId":"UBERON_0000948"},{"factorName":"hippocampus","color":"","value":"","svgPathId":"EFO_0000530"},{"factorName":"liver","color":"#C0C0C0","value":"136","svgPathId":"UBERON_0002107"},{"factorName":"lung","color":"","value":"","svgPathId":"UBERON_0002048"},{"factorName":"spleen","color":"","value":"","svgPathId":"UBERON_0002106"},{"factorName":"thymus","color":"","value":"","svgPathId":"UBERON_0002370"}]},
     {"id":"ENSMUSG00000039278","name":"Pcsk1n","expressions":[{"factorName":"heart","color":"","value":"","svgPathId":"UBERON_0000948"},{"factorName":"hippocampus","color":"#C0C0C0","value":"132","svgPathId":"EFO_0000530"},{"factorName":"liver","color":"","value":"","svgPathId":"UBERON_0002107"},{"factorName":"lung","color":"","value":"","svgPathId":"UBERON_0002048"},{"factorName":"spleen","color":"","value":"","svgPathId":"UBERON_0002106"},{"factorName":"thymus","color":"","value":"","svgPathId":"UBERON_0002370"}]},
     {"id":"ENSMUSG00000090298","name":"Gm4794","expressions":[{"factorName":"heart","color":"","value":"","svgPathId":"UBERON_0000948"},{"factorName":"hippocampus","color":"","value":"","svgPathId":"EFO_0000530"},{"factorName":"liver","color":"#C0C0C0","value":"132","svgPathId":"UBERON_0002107"},{"factorName":"lung","color":"","value":"","svgPathId":"UBERON_0002048"},{"factorName":"spleen","color":"","value":"","svgPathId":"UBERON_0002106"},{"factorName":"thymus","color":"","value":"","svgPathId":"UBERON_0002370"}]},
     {"id":"ENSMUSG00000002500","name":"Rpl3l","expressions":[{"factorName":"heart","color":"#C0C0C0","value":"127","svgPathId":"UBERON_0000948"},{"factorName":"hippocampus","color":"","value":"","svgPathId":"EFO_0000530"},{"factorName":"liver","color":"","value":"","svgPathId":"UBERON_0002107"},{"factorName":"lung","color":"","value":"","svgPathId":"UBERON_0002048"},{"factorName":"spleen","color":"","value":"","svgPathId":"UBERON_0002106"},{"factorName":"thymus","color":"","value":"","svgPathId":"UBERON_0002370"}]},
     {"id":"ENSMUSG00000029158","name":"Yipf7","expressions":[{"factorName":"heart","color":"#C0C0C0","value":"123","svgPathId":"UBERON_0000948"},{"factorName":"hippocampus","color":"","value":"","svgPathId":"EFO_0000530"},{"factorName":"liver","color":"","value":"","svgPathId":"UBERON_0002107"},{"factorName":"lung","color":"","value":"","svgPathId":"UBERON_0002048"},{"factorName":"spleen","color":"","value":"","svgPathId":"UBERON_0002106"},{"factorName":"thymus","color":"","value":"","svgPathId":"UBERON_0002370"}]},
     */
    propTypes: {
        anatomogramData: React.PropTypes.object.isRequired,
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
                        value: React.PropTypes.string.isRequired,
                        svgPathId: React.PropTypes.string
                    })
                ).isRequired
            })
        ).isRequired,
        eventEmitter: React.PropTypes.instanceOf(EventEmitter),
        atlasBaseURL: React.PropTypes.string.isRequired
    },

    getInitialState: function() {

        var availableAnatomograms = [];
        if (this.props.anatomogramData.maleAnatomogramFile) {
            availableAnatomograms.push(
                {id: "male",
                 anatomogramFile: this.props.atlasBaseURL + "/resources/svg/" + this.props.anatomogramData.maleAnatomogramFile,
                 toggleSrcTemplate: this.props.atlasBaseURL + this.props.anatomogramData.toggleButtonMaleImageTemplate}
            );
        }
        if (this.props.anatomogramData.femaleAnatomogramFile) {
            availableAnatomograms.push(
                {id: "female",
                 anatomogramFile: this.props.atlasBaseURL + "/resources/svg/" + this.props.anatomogramData.femaleAnatomogramFile,
                 toggleSrcTemplate: this.props.atlasBaseURL + this.props.anatomogramData.toggleButtonFemaleImageTemplate}
            );
        }
        if (this.props.anatomogramData.brainAnatomogramFile) {
            availableAnatomograms.push(
                {id: "brain",
                 anatomogramFile: this.props.atlasBaseURL + "/resources/svg/" + this.props.anatomogramData.brainAnatomogramFile,
                 toggleSrcTemplate: this.props.atlasBaseURL + this.props.anatomogramData.toggleButtonBrainImageTemplate}
            );
        }


        var allExpressedFactors = [],
            expressedFactorsPerRow = {};
        this.props.profileRows.forEach(function(profileRow) {
            var expressedFactors = [];
            profileRow.expressions.forEach(function(expression) {
                if (expression.value !== "NT" && expression.value !== "") {
                    expressedFactors.push(expression.svgPathId);
                }
            });
            expressedFactorsPerRow[profileRow.name] = expressedFactors;
            allExpressedFactors = allExpressedFactors.concat(expressedFactors);
        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        return {
            selectedId: availableAnatomograms[0].id,
            availableAnatomograms: availableAnatomograms,
            expressedFactors: allExpressedFactors.filter(onlyUnique),
            expressedFactorsPerRow: expressedFactorsPerRow,
            hoveredPathId: null,
            hoveredRowId: null
        }
    },

    render: function () {
        function containsHuman(str) {
            return str.indexOf("human") > -1;
        }

        var height = containsHuman(this.props.anatomogramData.maleAnatomogramFile) ? "375" : "265";

        return (
            <div className="gxaAnatomogram" style={{display: "table", paddingTop: "4px"}}>
                <div style={{display: "table-row"}}>
                    <div style={{display: "table-cell", verticalAlign: "top"}}>
                        <AnatomogramSelectImageButtons selectedId={this.state.selectedId} availableAnatomograms={this.state.availableAnatomograms} onClick={this._handleChange}/>
                    </div>

                    <svg ref="anatomogram" style={{display: "table-cell", width: "230px", height:height + "px"}}>
                    </svg>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        this.props.eventEmitter.addListener("gxaHeatmapColumnHoverChange", this._highlightPath);
        this.props.eventEmitter.addListener("gxaHeatmapRowHoverChange", this._highlightRow);
        this._loadAnatomogram(this._getAnatomogramSVGFile(this.state.selectedId));
    },

    // Only displays/highlights the relevant tissues to avoid loading the anatomogram every time we hover over a tissue or a factor header
    componentDidUpdate: function() {
        var svg = Snap(ReactDOM.findDOMNode(this.refs.anatomogram)).select("g");
        this._displayAllOrganismParts(svg);
    },

    _handleChange: function(newSelectedId) {
        if (newSelectedId !== this.state.selectedId) {
            this._loadAnatomogram(this._getAnatomogramSVGFile(newSelectedId));
            this.setState({selectedId: newSelectedId});
        }
    },

    // TODO We could manually highlight un-highlight the affected tissues instead of re-displaying all of them, as setState triggers componentDidUpdate
    _highlightPath: function(svgPathId) {
        this.setState({hoveredPathId: svgPathId});
    },

    _highlightRow: function(rowId) {
        this.setState({hoveredRowId: rowId});

    },

    _getAnatomogramSVGFile: function(id) {
        for (var i = 0 ; i < this.state.availableAnatomograms.length ; i++) {
            if (id === this.state.availableAnatomograms[i].id) {
                return this.state.availableAnatomograms[i].anatomogramFile;
            }
        }
    },

    _loadAnatomogram: function(svgFile) {

        var svgCanvas = Snap(ReactDOM.findDOMNode(this.refs.anatomogram)),
            $svgCanvas = $(ReactDOM.findDOMNode(this.refs.anatomogram)),
            allElements = svgCanvas.selectAll("*");

        if (allElements) {
            allElements.remove();
        }

        var displayAllOrganismPartsCallback = this._displayAllOrganismParts;
        var registerHoverEventsCallback = this._registerHoverEvents;
        Snap.load(
            svgFile,
            function (fragment) {
                var g = fragment.select("g");
                g.transform("S1.6,0,0");
                displayAllOrganismPartsCallback(g);
                registerHoverEventsCallback(g);
                svgCanvas.append(g);
                var img = fragment.select("#ccLogo");
                var heightTranslate = $svgCanvas.height() - 15;
                var widthTranslate = $svgCanvas.width() / 2 - 40;
                img.transform("t"+widthTranslate+","+heightTranslate);
                svgCanvas.append(img);
            }
        );
    },

    _displayAllOrganismParts: function(svg) {
        if (svg) {  // Sometimes svg is null... why?
            this.props.anatomogramData.allSvgPathIds.forEach(function(svgPathId) {
                this._displayOrganismPartsWithDefaultProperties(svg, svgPathId);
            }, this);
        }
    },

    _hoveredRowContainsPathId: function(svgPathId) {
        if (!this.state.hoveredRowId) {
            return false;
        }

        return (this.state.expressedFactorsPerRow[this.state.hoveredRowId].indexOf(svgPathId) > -1);
    },

    _displayOrganismPartsWithDefaultProperties: function(svg, svgPathId) {

        var colour = this.props.expressedTissueColour;
        if (this.state.hoveredPathId === svgPathId || this._hoveredRowContainsPathId(svgPathId))  {
            colour = this.props.hoveredTissueColour;
        }

        if (this.state.expressedFactors.indexOf(svgPathId) > -1) {
            this._highlightOrganismParts(svg, svgPathId, colour, 0.7);
        } else {
            this._highlightOrganismParts(svg, svgPathId, "gray", 0.5);
        }
    },

    _highlightOrganismParts: function(svg, svgPathId, colour, opacity) {
        Anatomogram._recursivelyChangeProperties(svg.select("#" + svgPathId), colour, opacity);
    },

    _registerHoverEvents: function(svg) {
        if (svg) {  // Sometimes svg is null... why?

            var eventEmitter = this.props.eventEmitter,
                hoverColour = this.props.hoveredTissueColour,
                highlightOrganismPartsCallback = this._highlightOrganismParts,
                displayOrganismPartsWithDefaultPropertiesCallback = this._displayOrganismPartsWithDefaultProperties;
            var mouseoverCallback = function(svgPathId) {
                highlightOrganismPartsCallback(svg, svgPathId, hoverColour, 0.7);
                eventEmitter.emit('gxaAnatomogramTissueMouseEnter', svgPathId);
            };
            var mouseoutCallback = function(svgPathId) {
                displayOrganismPartsWithDefaultPropertiesCallback(svg, svgPathId);
                eventEmitter.emit('gxaAnatomogramTissueMouseLeave', svgPathId);
            };

            this.props.anatomogramData.allSvgPathIds.forEach(function(svgPathId) {
                var svgElement = svg.select("#" + svgPathId);
                if (svgElement) {
                    svgElement.mouseover(function() {mouseoverCallback(svgPathId)});
                    svgElement.mouseout(function() {mouseoutCallback(svgPathId)});
                }
            }, this);
        }
    },

    statics: {
        _recursivelyChangeProperties: function(svgElement, colour, opacity) {

            if (svgElement) {
                var innerElements = svgElement.selectAll("*");

                if (innerElements.length > 0) {
                    innerElements.forEach(function(innerElement) {
                        Anatomogram._recursivelyChangeProperties(innerElement);
                    });
                }

                svgElement.attr({"fill": colour, "fill-opacity": opacity});
            }
        },

        _recursivelySelectElements: function(svgElement) {
            if (!svgElement) {
                return [];
            }

            var innerElements = svgElement.selectAll("*");
            if (innerElements.length === 0) {
                return [svgElement];
            } else {
                var allElements = [];
                innerElements.forEach(function(innerElement) {
                    allElements = allElements.concat(Anatomogram._recursivelySelectElements(innerElement));
                });
                return allElements;
            }
        }
    }

});

//*------------------------------------------------------------------*

module.exports = Anatomogram;
