var demoRenderer =
webpackJsonp_name_([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(163);

	module.exports = function (mountNode) {
	    ReactDOM.render(React.createElement(__webpack_require__(226), {}), mountNode);
	};

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);
	var validate = __webpack_require__(160);
	var Anatomogram = __webpack_require__(161);
	var getSvgsForSpecies = __webpack_require__(166).GetSvgsForSpecies;
	var EventEmitter = __webpack_require__(223);
	__webpack_require__(224);

	//*------------------------------------------------------------------*

	var RequiredString = React.PropTypes.string.isRequired;

	var argumentShape = {
	    pathToFolderWithBundledResources: RequiredString,
	    anatomogramData: React.PropTypes.shape({
	        species: RequiredString,
	        allSvgPathIds: React.PropTypes.arrayOf(RequiredString) //if not provided, we use properties read in from the file
	    }).isRequired,
	    expressedTissueColour: RequiredString,
	    hoveredTissueColour: RequiredString,
	    eventEmitter: React.PropTypes.instanceOf(EventEmitter)
	};

	var _availableAnatomograms = function _availableAnatomograms(species, pathToFolderWithBundledResources, allSvgPathIds) {
	    return getSvgsForSpecies(pathToFolderWithBundledResources, species).filter(function (e) {
	        return !allSvgPathIds || allSvgPathIds.some(function (id) {
	            return e.ids.indexOf(id) > -1;
	        });
	    });
	};

	var callEmitterWhenMousedOverTissuesChange = function callEmitterWhenMousedOverTissuesChange(eventEmitter) {
	    var forEachXNotInYsEmit = function forEachXNotInYsEmit(xs, ys, eventName) {
	        xs.filter(function (id) {
	            return ys.indexOf(id) === -1;
	        }).forEach(function (id) {
	            eventEmitter.emit(eventName, id);
	        });
	    };

	    return function emitEvents(nextIds, previousIds) {
	        forEachXNotInYsEmit(nextIds, previousIds, 'gxaAnatomogramTissueMouseEnter');
	        forEachXNotInYsEmit(previousIds, nextIds, 'gxaAnatomogramTissueMouseLeave');
	    };
	};

	var createAnatomogram = function createAnatomogram(args) {
	    validate(args, argumentShape);

	    var availableAnatomograms = _availableAnatomograms(args.anatomogramData.species, args.pathToFolderWithBundledResources, args.anatomogramData.allSvgPathIds || null);

	    return availableAnatomograms.length ? React.createElement(Anatomogram, _extends({
	        pathToFolderWithBundledResources: args.pathToFolderWithBundledResources,
	        expressedTissueColour: args.expressedTissueColour,
	        hoveredTissueColour: args.hoveredTissueColour,
	        availableAnatomograms: availableAnatomograms,
	        height: args.anatomogramData.species.indexOf("homo sapiens") > -1 ? 375 : 265,
	        whenMousedOverIdsChange: args.whenMousedOverIdsChange || (args.eventEmitter ? callEmitterWhenMousedOverTissuesChange(args.eventEmitter) : function () {}),
	        idsExpressedInExperiment: args.idsExpressedInExperiment || args.ontologyIdsForTissuesExpressedInAllRows || [],
	        idsToBeHighlighted: args.idsToBeHighlighted || []
	    }, args.anatomogramData.allSvgPathIds ? { allSvgPathIds: args.anatomogramData.allSvgPathIds } : {})) : null;
	};

	//http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
	var arraysEqual = function arraysEqual(a, b) {
	    if (a === b) return true;
	    if (a == null || b == null) return false;
	    if (a.length != b.length) return false;
	    for (var i = 0; i < a.length; ++i) {
	        if (a[i] !== b[i]) return false;
	    }
	    return true;
	};

	var makeWrapper = function makeWrapper(ComponentClass) {
	    return React.createClass({
	        displayName: "WrappedComponent",
	        propTypes: {
	            ontologyIdsToHighlight: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	            onOntologyIdIsUnderFocus: React.PropTypes.func.isRequired,
	            componentProps: React.PropTypes.object.isRequired
	        },

	        shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	            return !arraysEqual(nextProps.ontologyIdsToHighlight, this.props.ontologyIdsToHighlight);
	        },
	        render: function render() {
	            return React.createElement(
	                'div',
	                { id: 'gxaAnatomogramWrapper' },
	                React.createElement(ComponentClass, _extends({ ontologyIdsToHighlight: this.props.ontologyIdsToHighlight,
	                    onOntologyIdIsUnderFocus: this.props.onOntologyIdIsUnderFocus
	                }, this.props.componentProps))
	            );
	        }
	    });
	};

	/**
	anatomogramConfig: see argumentShape
	componentClass : a React class to be wrapped. Should accept props onOntologyIdIsUnderFocus and ontologyIdsToHighlight
	componentProps : other props to be passed over.
	*/
	var wrapComponentWithAnatomogram = function wrapComponentWithAnatomogram(anatomogramConfig, componentClass, componentProps) {
	    var Wrapped = makeWrapper(componentClass);

	    return React.createClass({
	        displayName: "AnatomogramComponentWrapper",

	        getInitialState: function getInitialState() {
	            return {
	                ontologyIdsForComponentContentUnderFocus: [],
	                ontologyIdsForAnatomogramContentUnderFocus: []
	            };
	        },
	        render: function render() {
	            var _this = this;

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { id: 'gxaAnatomogramAside' },
	                    createAnatomogram(Object.assign({}, anatomogramConfig, {
	                        idsToBeHighlighted: this.state.ontologyIdsForComponentContentUnderFocus,
	                        whenMousedOverIdsChange: function whenMousedOverIdsChange(nextIds) {
	                            _this.setState({ ontologyIdsForAnatomogramContentUnderFocus: nextIds });
	                        }
	                    }))
	                ),
	                React.createElement(Wrapped, { componentProps: componentProps,
	                    onOntologyIdIsUnderFocus: function onOntologyIdIsUnderFocus(selectedIdOrIds) {
	                        _this.setState({
	                            ontologyIdsForComponentContentUnderFocus: selectedIdOrIds ? typeof selectedIdOrIds === 'string' ? [selectedIdOrIds] : selectedIdOrIds : [] });
	                    },
	                    ontologyIdsToHighlight: this.state.ontologyIdsForAnatomogramContentUnderFocus })
	            );
	        }
	    });
	};

	module.exports = { "create": createAnatomogram, "wrapComponent": wrapComponentWithAnatomogram };

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);
	var AnatomogramImage = __webpack_require__(162);
	var SelectionIcon = __webpack_require__(165);

	var Anatomogram = React.createClass({
	    displayName: "Anatomogram",

	    propTypes: {
	        pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
	        expressedTissueColour: React.PropTypes.string.isRequired,
	        hoveredTissueColour: React.PropTypes.string.isRequired,
	        availableAnatomograms: React.PropTypes.arrayOf(React.PropTypes.shape({
	            type: React.PropTypes.string.isRequired,
	            path: React.PropTypes.string.isRequired,
	            ids: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
	        })).isRequired,
	        height: React.PropTypes.number.isRequired,
	        whenMousedOverIdsChange: React.PropTypes.func,
	        allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string),
	        idsToBeHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
	    },

	    getInitialState: function getInitialState() {
	        return { selectedType: this.props.availableAnatomograms[0].type };
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "gxaAnatomogram", style: { display: "table", paddingTop: "4px" } },
	            React.createElement(
	                "div",
	                { style: { display: "table-row" } },
	                React.createElement(
	                    "div",
	                    { style: { display: "table-cell", verticalAlign: "top" } },
	                    this._anatomogramSelectImageButtons()
	                ),
	                React.createElement(AnatomogramImage, _extends({
	                    key: this.state.selectedType,
	                    file: this._selectedAnatomogram().path,
	                    allSvgPathIds: this.props.allSvgPathIds || this._selectedAnatomogram().ids
	                }, this.props))
	            )
	        );
	    },
	    _anatomogramSelectImageButtons: function _anatomogramSelectImageButtons() {
	        var _this = this;

	        return this.props.availableAnatomograms.length < 2 ? [] : this.props.availableAnatomograms.map(function (availableAnatomogram) {
	            return React.createElement(SelectionIcon, {
	                key: availableAnatomogram.type + "_toggle",
	                pathToFolderWithBundledResources: _this.props.pathToFolderWithBundledResources,
	                anatomogramType: availableAnatomogram.type,
	                selected: _this.state.selectedType === availableAnatomogram.type,
	                onClick: function onClick() {
	                    _this._afterUserSelectedAnatomogram(availableAnatomogram.type);
	                } });
	        });
	    },
	    _afterUserSelectedAnatomogram: function _afterUserSelectedAnatomogram(newSelectedType) {
	        if (newSelectedType !== this.state.selectedType) {
	            this.setState({ selectedType: newSelectedType });
	        }
	    },
	    _selectedAnatomogram: function _selectedAnatomogram() {
	        var _this2 = this;

	        return this.props.availableAnatomograms.filter(function (e) {
	            return e.type === _this2.state.selectedType;
	        }).concat({
	            type: "_",
	            path: "__invalid__.svg",
	            ids: []
	        })[0];
	    }
	});

	module.exports = Anatomogram;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(163);
	var Snap = __webpack_require__(164);

	//http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
	var ArraysEqual = function ArraysEqual(a, b) {
	    if (a === b) return true;
	    if (a == null || b == null) return false;
	    if (a.length != b.length) return false;
	    for (var i = 0; i < a.length; ++i) {
	        if (a[i] !== b[i]) return false;
	    }
	    return true;
	};

	var AnatomogramImageParts = React.createClass({
	    displayName: "AnatomogramImageParts",

	    propTypes: {
	        idsExpressedInExperiment: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	        idsHeatmapWantsHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	        idsMousedOver: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	        idsNotHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	        expressedTissueColour: React.PropTypes.string.isRequired,
	        hoveredTissueColour: React.PropTypes.string.isRequired,
	        whenMousedOverIdsChange: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return { whenMousedOverIdsChange: function whenMousedOverIdsChange(nextIds, oldIds) {} };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            toDraw: [].concat(this._idsThatShouldBeStronglyHighlighted(this.props).map(this._highlightStrongly), this.props.idsExpressedInExperiment.map(this._highlightSlightly), this.props.idsNotHighlighted.map(this._highlightAsBackground)) };
	    },
	    render: function render() {
	        return React.createElement("span", null);
	    },
	    _highlightStrongly: function _highlightStrongly(svgPathId) {
	        return { id: svgPathId, colour: this.props.hoveredTissueColour, opacity: 0.7 };
	    },
	    _highlightSlightly: function _highlightSlightly(svgPathId) {
	        return { id: svgPathId, colour: this.props.expressedTissueColour, opacity: 0.5 };
	    },
	    _highlightAsBackground: function _highlightAsBackground(svgPathId) {
	        return { id: svgPathId, colour: "gray", opacity: 0.5 };
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        this.props.whenMousedOverIdsChange([], this.props.idsMousedOver);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this = this;

	        if (!ArraysEqual(nextProps.idsMousedOver, this.props.idsMousedOver)) {
	            this.props.whenMousedOverIdsChange(nextProps.idsMousedOver, this.props.idsMousedOver);
	        }
	        var oldStrong = this._idsThatShouldBeStronglyHighlighted(this.props);
	        var newStrong = this._idsThatShouldBeStronglyHighlighted(nextProps);
	        var oldWeak = this.props.idsExpressedInExperiment;
	        var newWeak = nextProps.idsExpressedInExperiment;

	        var toDraw = [].concat(
	        //ids that heatmap wants highlighted are the most highlighted
	        newStrong.filter(function (id) {
	            return !oldStrong.includes(id);
	        }).map(this._highlightStrongly),
	        //ids that are expressed in the experiment are highlighted with a weaker colour, often the same as background
	        newWeak.filter(function (id) {
	            return !newStrong.includes(id);
	        }).filter(function (id) {
	            return !oldWeak.includes(id);
	        }).map(this._highlightSlightly), nextProps.idsNotHighlighted.filter(function (id) {
	            return !_this.props.idsNotHighlighted.includes(id);
	        }).map(this._highlightAsBackground));

	        this.setState({ toDraw: toDraw });
	    },
	    _idsThatShouldBeStronglyHighlighted: function _idsThatShouldBeStronglyHighlighted(properties) {
	        return properties.idsHeatmapWantsHighlighted.concat(properties.idsMousedOver);
	    }
	});

	var AnatomogramImage = React.createClass({
	    displayName: "AnatomogramImage",

	    propTypes: {
	        file: function file(props, propName, componentName) {
	            if (propName === "file") {
	                if (typeof props[propName] !== "string") {
	                    return new Error("Expected string to specify file, got: " + props[propName]);
	                }
	                if (!props[propName]) {
	                    return new Error("Path to file empty!");
	                }
	            }
	            return "";
	        },
	        height: React.PropTypes.number.isRequired,
	        allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	        idsExpressedInExperiment: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	        idsToBeHighlighted: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	        expressedTissueColour: React.PropTypes.string.isRequired,
	        hoveredTissueColour: React.PropTypes.string.isRequired,
	        whenMousedOverIdsChange: React.PropTypes.func
	    },

	    getInitialState: function getInitialState() {
	        return { mousedOverSvgIds: [] };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (nextProps.file !== this.props.file) {
	            this._loadAnatomogram(nextProps.file);
	        }
	    },
	    componentDidMount: function componentDidMount() {
	        this._loadAnatomogram(this.props.file);
	        this._draw();
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        this._draw();
	    },
	    _draw: function _draw() {
	        var svg = Snap(ReactDOM.findDOMNode(this._anatomogram)).select("#LAYER_EFO");
	        if (svg !== null) {
	            this._drawOnSvg(svg, this._imageParts.state.toDraw);
	            this._imageParts.setState({ toDraw: [] });
	        }
	    },
	    _drawInitialLayout: function _drawInitialLayout(svg) {
	        if (this._imageParts) {
	            this._drawOnSvg(svg, this._imageParts.getInitialState().toDraw);
	            this._imageParts.setState({ toDraw: [] });
	        }
	    },
	    _drawOnSvg: function _drawOnSvg(svg, instructions) {
	        var _this2 = this;

	        instructions.forEach(function (instruction) {
	            _this2._highlightOrganismParts(svg, instruction.id, instruction.colour, instruction.opacity);
	        });
	    },
	    render: function render() {
	        var _this3 = this;

	        var idsExpressedInExperiment = [],
	            idsHoveredOver = [],
	            idsHeatmapWantsHighlighted = [],
	            idsNotHighlighted = [];

	        this.props.allSvgPathIds.forEach(function (id) {
	            if (_this3.state.mousedOverSvgIds.includes(id)) {
	                idsHoveredOver.push(id);
	            } else if (_this3.props.idsToBeHighlighted.includes(id)) {
	                idsHeatmapWantsHighlighted.push(id);
	            } else if (_this3.props.idsExpressedInExperiment.includes(id)) {
	                idsExpressedInExperiment.push(id);
	            } else {
	                idsNotHighlighted.push(id);
	            }
	        });

	        return React.createElement(
	            "span",
	            null,
	            React.createElement("svg", { ref: function ref(c) {
	                    return _this3._anatomogram = c;
	                }, style: { display: "table-cell", width: "230px", height: this.props.height + "px" } }),
	            React.createElement(AnatomogramImageParts, {
	                ref: function ref(c) {
	                    return _this3._imageParts = c;
	                }, key: this.props.file,
	                idsExpressedInExperiment: idsExpressedInExperiment,
	                idsHeatmapWantsHighlighted: idsHeatmapWantsHighlighted,
	                idsMousedOver: idsHoveredOver,
	                idsNotHighlighted: idsNotHighlighted,
	                expressedTissueColour: this.props.expressedTissueColour,
	                hoveredTissueColour: this.props.hoveredTissueColour,
	                whenMousedOverIdsChange: this.props.whenMousedOverIdsChange
	            })
	        );
	    },
	    _highlightPath: function _highlightPath(svgPathId) {
	        this.setState({ hoveredPathId: svgPathId });
	    },
	    _loadAnatomogram: function _loadAnatomogram(svgFile) {
	        var _this4 = this;

	        var svgCanvas = Snap(ReactDOM.findDOMNode(this._anatomogram)),
	            allElements = svgCanvas.selectAll("*");

	        if (allElements) {
	            allElements.remove();
	        }

	        var displayAllOrganismPartsCallback = this._drawInitialLayout;
	        var registerHoverEventsCallback = this._registerHoverEvents;

	        Snap.load(svgFile, function (fragment) {
	            displayAllOrganismPartsCallback(fragment.select("#LAYER_EFO"));
	            registerHoverEventsCallback(fragment.select("#LAYER_EFO"));
	            fragment.selectAll("svg > g").forEach(function (g) {
	                g.transform("S1.6,0,0");
	                svgCanvas.append(g);
	            });
	            var img = fragment.select("#ccLogo");
	            if (img) {
	                // svgCanvas.node.clientHeight and svgCanvas.node.clientWidth is more “correct” but are 0 in Firefox
	                var heightTranslate = Number.parseInt(_this4._anatomogram.style.height) - 15;
	                var widthTranslate = Number.parseInt(_this4._anatomogram.style.width) / 2 - 40;
	                img.transform("t" + widthTranslate + "," + heightTranslate);
	                svgCanvas.append(img);
	            }
	        });
	    },
	    _registerHoverEvents: function _registerHoverEvents(svg) {
	        var _this5 = this;

	        if (svg) {
	            (function () {
	                // Sometimes svg is null... why?
	                var MaxOverlappingTissues = 5;
	                var mouseoverCallback = function mouseoverCallback(svgPathId) {
	                    _this5.setState(function (previousState) {
	                        return { mousedOverSvgIds: [].concat(_toConsumableArray(previousState.mousedOverSvgIds), [svgPathId]).slice(-MaxOverlappingTissues) };
	                    });
	                };

	                var mouseoutCallback = function mouseoutCallback(svgPathId) {
	                    _this5.setState(function (previousState) {
	                        return { mousedOverSvgIds: previousState.mousedOverSvgIds.map(function (el) {
	                                return el === svgPathId ? "" : el;
	                            }) };
	                    });
	                };

	                var attachCallbacks = function attachCallbacks(svgElement, svgPathId) {
	                    if (svgElement) {
	                        svgElement.mouseover(function () {
	                            mouseoverCallback(svgPathId);
	                        });
	                        svgElement.mouseout(function () {
	                            mouseoutCallback(svgPathId);
	                        });
	                    }
	                };

	                _this5.props.allSvgPathIds.forEach(function (svgPathId) {
	                    var svgElement = svg.select("#" + svgPathId);
	                    attachCallbacks(svgElement, svgPathId);
	                    if (svgElement && svgElement.type === "use") {
	                        attachCallbacks(svg.select(svgElement.node.getAttribute("xlink:href")), svgPathId);
	                    }
	                });
	            })();
	        }
	    },
	    _highlightOrganismParts: function _highlightOrganismParts(svg, svgPathId, colour, opacity) {
	        var el = svg.select("#" + svgPathId);
	        if (el && el.type === "use") {
	            this._recursivelyChangeProperties(svg.select(el.node.getAttribute("xlink:href")), colour, opacity);
	        }
	        this._recursivelyChangeProperties(el, colour, opacity);
	    },
	    _recursivelyChangeProperties: function _recursivelyChangeProperties(svgElement, colour, opacity) {
	        var _this6 = this;

	        if (svgElement) {
	            svgElement.selectAll("*").forEach(function (innerElement) {
	                _this6._recursivelyChangeProperties(innerElement);
	            });
	            svgElement.attr({ "fill": colour, "fill-opacity": opacity });
	        }
	    }
	});

	module.exports = AnatomogramImage;

/***/ },
/* 163 */,
/* 164 */,
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var ResolvePathToIcon = __webpack_require__(166).ResolvePathToIcon;
	__webpack_require__(219);

	var SelectionIcon = React.createClass({
	    displayName: "SelectionIcon",

	    propTypes: {
	        pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
	        anatomogramType: React.PropTypes.oneOf(["brain", "female", "male", "whole_plant", "flower_parts"]).isRequired,
	        selected: React.PropTypes.bool.isRequired,
	        onClick: React.PropTypes.func.isRequired
	    },

	    render: function render() {
	        return React.createElement("img", { className: "selection-icon", onClick: this.props.onClick,
	            src: ResolvePathToIcon(this.props.pathToFolderWithBundledResources, this.props.anatomogramType, this.props.selected) });
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	        return this.props.selected !== nextProps.selected;
	    }
	});

	module.exports = SelectionIcon;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Url = __webpack_require__(167);
	var Path = __webpack_require__(173);
	var SvgsForSpecies = __webpack_require__(174);
	var IdsForSvgs = __webpack_require__(175);

	var ResolvePathToIcon = function ResolvePathToIcon(pathToFolderWithBundledResources, type, selected) {
	    return Url.resolve(pathToFolderWithBundledResources, Path.basename(__webpack_require__(176)("./" + type + "_" + (selected ? "" : "un") + "selected.png")));
	};

	var ResolvePathToSvg = function ResolvePathToSvg(pathToFolderWithBundledResources, svg) {
	    return Url.resolve(pathToFolderWithBundledResources, Path.basename(__webpack_require__(187)("./" + svg)));
	};

	var GetSvgsForSpecies = function GetSvgsForSpecies(pathToFolderWithBundledResources, species) {
	    var svgEntry = SvgsForSpecies[species];
	    if (typeof svgEntry === "object") {
	        return Object.keys(svgEntry).map(function (anatomogramType) {
	            return {
	                type: anatomogramType,
	                path: ResolvePathToSvg(pathToFolderWithBundledResources, svgEntry[anatomogramType]),
	                ids: IdsForSvgs[svgEntry[anatomogramType]]
	            };
	        });
	    } else if (typeof svgEntry === "string") {
	        return [{
	            type: "svg",
	            path: ResolvePathToSvg(pathToFolderWithBundledResources, svgEntry),
	            ids: IdsForSvgs[svgEntry]
	        }];
	    } else {
	        return [];
	    }
	};

	module.exports = { GetSvgsForSpecies: GetSvgsForSpecies, ResolvePathToIcon: ResolvePathToIcon };

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var punycode = __webpack_require__(168);

	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;

	exports.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(170);

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};

	function isString(arg) {
	  return typeof arg === "string";
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(169)(module), (function() { return this; }())))

/***/ },
/* 169 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(171);
	exports.encode = exports.stringify = __webpack_require__(172);


/***/ },
/* 171 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};


/***/ },
/* 172 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 174 */
/***/ function(module, exports) {

	module.exports = {
		"anolis carolinensis": "anolis_carolinensis.svg",
		"arabidopsis thaliana": "arabidopsis_thaliana_whole_plant.svg",
		"bos taurus": "cow.svg",
		"brachypodium distachyon": {
			"whole_plant": "brachypodium_distachyon_whole_plant.svg",
			"flower_parts": "brachypodium_distachyon_flower_parts.svg"
		},
		"gallus gallus": "chicken.svg",
		"homo sapiens": {
			"male": "human_male.svg",
			"female": "human_female.svg",
			"brain": "human_brain.svg"
		},
		"hordeum vulgare": {
			"whole_plant": "hordeum_vulgare_whole_plant.svg",
			"flower_parts": "hordeum_vulgare_flower_parts.svg"
		},
		"hordeum vulgare subsp. vulgare": {
			"whole_plant": "hordeum_vulgare_whole_plant.svg",
			"flower_parts": "hordeum_vulgare_flower_parts.svg"
		},
		"macaca mulatta": "macaca_mulatta.svg",
		"monodelphis domestica": "monodelphis_domestica.svg",
		"mus musculus": {
			"male": "mouse_male.svg",
			"female": "mouse_female.svg",
			"brain": "mouse_brain.svg"
		},
		"oryza sativa": {
			"whole_plant": "oryza_sativa_whole_plant.svg",
			"flower_parts": "oryza_sativa_flower_parts.svg"
		},
		"oryza sativa japonica group": {
			"whole_plant": "oryza_sativa_whole_plant.svg",
			"flower_parts": "oryza_sativa_flower_parts.svg"
		},
		"papio anubis": "papio_anubis.svg",
		"rattus norvegicus": "rat.svg",
		"solanum lycopersicum": {
			"whole_plant": "solanum_lycopersicum_whole_plant.svg",
			"flower_parts": "solanum_lycopersicum_flower_parts.svg"
		},
		"sorghum bicolor": {
			"whole_plant": "sorghum_bicolor_whole_plant.svg",
			"flower_parts": "sorghum_bicolor_flower_parts.svg"
		},
		"triticum aestivum": {
			"whole_plant": "triticum_aestivum_whole_plant.svg",
			"flower_parts": "triticum_aestivum_flower_parts.svg"
		},
		"tetraodon nigrovirdis": "tetraodon_nigroviridis.svg",
		"xenopus tropicalis": "xenopus_tropicalis.svg",
		"zea mays": {
			"whole_plant": "zea_mays_whole_plant.svg",
			"flower_parts": "zea_mays_flower_parts.svg"
		}
	};

/***/ },
/* 175 */
/***/ function(module, exports) {

	module.exports = {
		"mouse_female.svg": [
			"UBERON_0000010",
			"UBERON_0000014",
			"UBERON_0000029",
			"UBERON_0000945",
			"UBERON_0000947",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0000970",
			"UBERON_0000981",
			"UBERON_0000990",
			"UBERON_0000995",
			"UBERON_0000996",
			"UBERON_0001009",
			"UBERON_0001043",
			"UBERON_0001103",
			"UBERON_0001132",
			"UBERON_0001153",
			"UBERON_0001155",
			"UBERON_0001211",
			"UBERON_0001242",
			"UBERON_0001255",
			"UBERON_0001264",
			"UBERON_0001322",
			"UBERON_0001347",
			"UBERON_0001348",
			"UBERON_0001377",
			"UBERON_0001645",
			"UBERON_0001723",
			"UBERON_0001736",
			"UBERON_0001831",
			"UBERON_0001911",
			"UBERON_0001981",
			"UBERON_0002046",
			"UBERON_0002048",
			"UBERON_0002103",
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002108",
			"UBERON_0002110",
			"UBERON_0002113",
			"UBERON_0002114",
			"UBERON_0002115",
			"UBERON_0002116",
			"UBERON_0002240",
			"UBERON_0002369",
			"UBERON_0002370",
			"UBERON_0002371",
			"UBERON_0003126",
			"UBERON_0003134",
			"UBERON_0007844",
			"UBERON_0014892"
		],
		"brachypodium_distachyon_flower_parts.svg": [
			"PO_0009001",
			"PO_0009009",
			"PO_0009030",
			"PO_0009066",
			"PO_0009089"
		],
		"mouse_male.svg": [
			"UBERON_0000010",
			"UBERON_0000014",
			"UBERON_0000029",
			"UBERON_0000473",
			"UBERON_0000945",
			"UBERON_0000947",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0000970",
			"UBERON_0000981",
			"UBERON_0000989",
			"UBERON_0000998",
			"UBERON_0001000",
			"UBERON_0001009",
			"UBERON_0001043",
			"UBERON_0001103",
			"UBERON_0001132",
			"UBERON_0001153",
			"UBERON_0001155",
			"UBERON_0001211",
			"UBERON_0001242",
			"UBERON_0001255",
			"UBERON_0001264",
			"UBERON_0001301",
			"UBERON_0001322",
			"UBERON_0001347",
			"UBERON_0001348",
			"UBERON_0001377",
			"UBERON_0001645",
			"UBERON_0001723",
			"UBERON_0001736",
			"UBERON_0001831",
			"UBERON_0001981",
			"UBERON_0002048",
			"UBERON_0002103",
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002108",
			"UBERON_0002110",
			"UBERON_0002113",
			"UBERON_0002114",
			"UBERON_0002115",
			"UBERON_0002116",
			"UBERON_0002240",
			"UBERON_0002367",
			"UBERON_0002369",
			"UBERON_0002370",
			"UBERON_0002371",
			"UBERON_0003126",
			"UBERON_0007844",
			"UBERON_0014892"
		],
		"cow.svg": [
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0001013",
			"UBERON_0001155",
			"UBERON_0001898",
			"UBERON_0002016",
			"UBERON_0002048",
			"UBERON_0002107",
			"UBERON_0002113",
			"UBERON_0002114",
			"UBERON_0014892"
		],
		"human_male.svg": [
			"CL_0000084",
			"CL_0000233",
			"CL_0000236",
			"CL_0000576",
			"CL_0000623",
			"CL_0000738",
			"UBERON_0000004",
			"UBERON_0000007",
			"UBERON_0000014",
			"UBERON_0000029",
			"UBERON_0000167",
			"UBERON_0000178",
			"UBERON_0000310",
			"UBERON_0000341",
			"UBERON_0000451",
			"UBERON_0000473",
			"UBERON_0000945",
			"UBERON_0000947",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0000956",
			"UBERON_0000966",
			"UBERON_0000970",
			"UBERON_0000977",
			"UBERON_0000989",
			"UBERON_0000998",
			"UBERON_0001000",
			"UBERON_0001013",
			"UBERON_0001021",
			"UBERON_0001043",
			"UBERON_0001044",
			"UBERON_0001052",
			"UBERON_0001103",
			"UBERON_0001134",
			"UBERON_0001135",
			"UBERON_0001153",
			"UBERON_0001154",
			"UBERON_0001155",
			"UBERON_0001225",
			"UBERON_0001255",
			"UBERON_0001264",
			"UBERON_0001301",
			"UBERON_0001621",
			"UBERON_0001637",
			"UBERON_0001706",
			"UBERON_0001723",
			"UBERON_0001728",
			"UBERON_0001736",
			"UBERON_0001831",
			"UBERON_0001870",
			"UBERON_0001871",
			"UBERON_0001876",
			"UBERON_0001954",
			"UBERON_0001981",
			"UBERON_0002037",
			"UBERON_0002046",
			"UBERON_0002048",
			"UBERON_0002079",
			"UBERON_0002084",
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002108",
			"UBERON_0002110",
			"UBERON_0002113",
			"UBERON_0002114",
			"UBERON_0002116",
			"UBERON_0002134",
			"UBERON_0002135",
			"UBERON_0002146",
			"UBERON_0002185",
			"UBERON_0002240",
			"UBERON_0002245",
			"UBERON_0002367",
			"UBERON_0002369",
			"UBERON_0002371",
			"UBERON_0002372",
			"UBERON_0002421",
			"UBERON_00024818",
			"UBERON_0003126",
			"UBERON_0006618",
			"UBERON_0007650",
			"UBERON_0007844"
		],
		"human_brain.svg": [
			"UBERON_0000451",
			"UBERON_0000956",
			"UBERON_0001870",
			"UBERON_0001871",
			"UBERON_0001872",
			"UBERON_0001873",
			"UBERON_0001874",
			"UBERON_0001875",
			"UBERON_0001876",
			"UBERON_0001882",
			"UBERON_0001894",
			"UBERON_0001896",
			"UBERON_0001897",
			"UBERON_0001898",
			"UBERON_0001905",
			"UBERON_0001954",
			"UBERON_0002021",
			"UBERON_0002037",
			"UBERON_0002038",
			"UBERON_0002148",
			"UBERON_0002245",
			"UBERON_0002285",
			"UBERON_0002360",
			"UBERON_0002363",
			"UBERON_0002421",
			"UBERON_0002702",
			"UBERON_0002771",
			"UBERON_0003027"
		],
		"mouse_brain.svg": [
			"EFO_0000530",
			"UBERON_0000004",
			"UBERON_0000007",
			"UBERON_0000369",
			"UBERON_0000956",
			"UBERON_0001891",
			"UBERON_0001894",
			"UBERON_0001896",
			"UBERON_0001897",
			"UBERON_0001898",
			"UBERON_0002037",
			"UBERON_0002259",
			"UBERON_0002298"
		],
		"triticum_aestivum_flower_parts.svg": [
			"PO_0009001",
			"PO_0009009",
			"PO_0009030",
			"PO_0009066",
			"PO_0009084",
			"PO_0009085",
			"PO_0009086",
			"PO_0009088",
			"PO_0009089",
			"PO_0020031",
			"PO_0020033"
		],
		"rat.svg": [
			"CL_0000336",
			"UBERON_0000473",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0000995",
			"UBERON_0001155",
			"UBERON_0001388",
			"UBERON_0002048",
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002113",
			"UBERON_0002370"
		],
		"tetraodon_nigroviridis.svg": [
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0002113",
			"UBERON_0014892"
		],
		"xenopus_tropicalis.svg": [
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0002107",
			"UBERON_0002113",
			"UBERON_0014892"
		],
		"oryza_sativa_whole_plant.svg": [
			"PO_0005052",
			"PO_0009005",
			"PO_0009006",
			"PO_0009049",
			"PO_0025034"
		],
		"brachypodium_distachyon_whole_plant.svg": [
			"PO_0009010",
			"PO_0009049",
			"PO_0025034"
		],
		"oryza_sativa_flower_parts.svg": [
			"PO_0009009",
			"PO_0009010",
			"PO_0009030",
			"PO_0009066",
			"PO_0009089"
		],
		"sorghum_bicolor_whole_plant.svg": [
			"PO_0000230",
			"PO_0006079",
			"PO_0009005",
			"PO_0009006",
			"PO_0009047",
			"PO_0009049",
			"PO_0025034"
		],
		"hordeum_vulgare_flower_parts.svg": [
			"PO_0009001",
			"PO_0009009",
			"PO_0009030",
			"PO_0009066",
			"PO_0009072",
			"PO_0009073"
		],
		"anolis_carolinensis.svg": [
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0002113",
			"UBERON_0014892"
		],
		"zea_mays_flower_parts.svg": [
			"PO_0009001",
			"PO_0009009",
			"PO_0009066",
			"PO_0009084",
			"PO_0009089",
			"PO_0020031",
			"PO_0020033",
			"PO_0020136",
			"PO_0025597"
		],
		"solanum_lycopersicum_whole_plant.svg": [
			"PO_0000056",
			"PO_0009001",
			"PO_0009005",
			"PO_0009046",
			"PO_0025034"
		],
		"monodelphis_domestica.svg": [
			"UBERON_0000473",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0002037",
			"UBERON_0002107",
			"UBERON_0002113"
		],
		"sorghum_bicolor_flower_parts.svg": [
			"PO_0009001",
			"PO_0009009",
			"PO_0009030",
			"PO_0009049",
			"PO_0009051",
			"PO_0009066",
			"PO_0009089"
		],
		"zea_mays_whole_plant.svg": [
			"PO_0009005",
			"PO_0009074",
			"PO_0020126",
			"PO_0020127",
			"PO_0020136",
			"PO_0020142",
			"PO_0025034"
		],
		"chicken.svg": [
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0001155",
			"UBERON_0002048",
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002113",
			"UBERON_0014892"
		],
		"human_female.svg": [
			"CL_0000084",
			"CL_0000233",
			"CL_0000236",
			"CL_0000576",
			"CL_0000623",
			"CL_0000738",
			"UBERON_0000002",
			"UBERON_0000004",
			"UBERON_0000007",
			"UBERON_0000029",
			"UBERON_0000167",
			"UBERON_0000178",
			"UBERON_0000310",
			"UBERON_0000341",
			"UBERON_0000451",
			"UBERON_0000945",
			"UBERON_0000947",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0000956",
			"UBERON_0000966",
			"UBERON_0000970",
			"UBERON_0000977",
			"UBERON_0000992",
			"UBERON_0000995",
			"UBERON_0000996",
			"UBERON_0001013",
			"UBERON_0001021",
			"UBERON_0001043",
			"UBERON_0001044",
			"UBERON_0001052",
			"UBERON_0001103",
			"UBERON_0001134",
			"UBERON_0001135",
			"UBERON_0001153",
			"UBERON_0001154",
			"UBERON_0001155",
			"UBERON_0001225",
			"UBERON_0001255",
			"UBERON_0001264",
			"UBERON_0001295",
			"UBERON_0001621",
			"UBERON_0001621",
			"UBERON_0001637",
			"UBERON_0001706",
			"UBERON_0001723",
			"UBERON_0001728",
			"UBERON_0001736",
			"UBERON_0001870",
			"UBERON_0001871",
			"UBERON_0001876",
			"UBERON_0001981",
			"UBERON_0001987",
			"UBERON_0002037",
			"UBERON_0002046",
			"UBERON_0002048",
			"UBERON_0002079",
			"UBERON_0002084",
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002108",
			"UBERON_0002110",
			"UBERON_0002113",
			"UBERON_0002114",
			"UBERON_0002116",
			"UBERON_0002134",
			"UBERON_0002135",
			"UBERON_0002146",
			"UBERON_0002185",
			"UBERON_0002245",
			"UBERON_0002369",
			"UBERON_0002371",
			"UBERON_0002372",
			"UBERON_0002421",
			"UBERON_0002481",
			"UBERON_0003889",
			"UBERON_0006618",
			"UBERON_0007650",
			"UBERON_0007844",
			"UBERON_0012249"
		],
		"triticum_aestivum_whole_plant.svg": [
			"PO_0009005",
			"PO_0009047",
			"PO_0009049",
			"PO_0025034"
		],
		"macaca_mulatta.svg": [
			"UBERON_0000451",
			"UBERON_0000473",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0002037",
			"UBERON_0002107",
			"UBERON_0002113"
		],
		"papio_anubis.svg": [
			"UBERON_0000007",
			"UBERON_0000029",
			"UBERON_0000945",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0001155",
			"UBERON_0001870",
			"UBERON_0001871",
			"UBERON_0002037",
			"UBERON_0002048",
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002113",
			"UBERON_0002371",
			"UBERON_0014892"
		],
		"hordeum_vulgare_whole_plant.svg": [
			"PO_0009005",
			"PO_0009006",
			"PO_0009049",
			"PO_0020142",
			"PO_0025034"
		],
		"solanum_tuberosum_whole_plant.svg": [],
		"arabidopsis_thaliana_whole_plant.svg": [
			"PO_0009001",
			"PO_0009005",
			"PO_0009046",
			"PO_0025034"
		],
		"solanum_lycopersicum_flower_parts.svg": [
			"PO_0009010",
			"PO_0009030",
			"PO_0009066",
			"PO_0009072",
			"PO_0009073",
			"PO_0009074",
			"PO_0009084"
		]
	};

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./brain_selected.png": 177,
		"./brain_unselected.png": 178,
		"./female_selected.png": 179,
		"./female_unselected.png": 180,
		"./flower_parts_selected.png": 181,
		"./flower_parts_unselected.png": 182,
		"./male_selected.png": 183,
		"./male_unselected.png": 184,
		"./whole_plant_selected.png": 185,
		"./whole_plant_unselected.png": 186
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 176;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cbe297d1ea7bf5aac3cfcd540c8be570.png";

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bc6cb140072af5b41e6dc150228f8735.png";

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3661376bad0ed63dd397d20227943739.png";

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f1a4ab676c0362ce2f16c8f25bd4f863.png";

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0a8a46f3670c36c03bc15a90db754a19.png";

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ad3370345bfd3369763a3f106f57dcb5.png";

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bc6d754760910043bb887ade6e598cd3.png";

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8c0597cbe1b70b385479fc347d5b83fa.png";

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "130a3f15fc96a7fa5e9ac4db73d9aa37.png";

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "568a8e809ccaac58b013552d275965f8.png";

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./anolis_carolinensis.svg": 188,
		"./arabidopsis_thaliana_whole_plant.svg": 189,
		"./brachypodium_distachyon_flower_parts.svg": 190,
		"./brachypodium_distachyon_whole_plant.svg": 191,
		"./chicken.svg": 192,
		"./cow.svg": 193,
		"./hordeum_vulgare_flower_parts.svg": 194,
		"./hordeum_vulgare_whole_plant.svg": 195,
		"./human_brain.svg": 196,
		"./human_female.svg": 197,
		"./human_male.svg": 198,
		"./macaca_mulatta.svg": 199,
		"./monodelphis_domestica.svg": 200,
		"./mouse_brain.svg": 201,
		"./mouse_female.svg": 202,
		"./mouse_male.svg": 203,
		"./oryza_sativa_flower_parts.svg": 204,
		"./oryza_sativa_whole_plant.svg": 205,
		"./papio_anubis.svg": 206,
		"./rat.svg": 207,
		"./solanum_lycopersicum_flower_parts.svg": 208,
		"./solanum_lycopersicum_whole_plant.svg": 209,
		"./solanum_tuberosum_whole_plant.svg": 210,
		"./sorghum_bicolor_flower_parts.svg": 211,
		"./sorghum_bicolor_whole_plant.svg": 212,
		"./tetraodon_nigroviridis.svg": 213,
		"./triticum_aestivum_flower_parts.svg": 214,
		"./triticum_aestivum_whole_plant.svg": 215,
		"./xenopus_tropicalis.svg": 216,
		"./zea_mays_flower_parts.svg": 217,
		"./zea_mays_whole_plant.svg": 218
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 187;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "15e3c69b67d92ca008087978d6b8448e.svg";

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "98c06a5c7a59b3bab435902524ffe7d8.svg";

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cb470d533c62706f829d5f4f38aa425e.svg";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8483707aa435eba64fda951ff49ccb11.svg";

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2a49f7c1bbfd4ce9943dd967b6565d97.svg";

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6a792bb3d4f6b7ab4c4e13b2511b17f2.svg";

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "173fddfa0293be721333dd0488441bad.svg";

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a5a63a356c3d5b0ebd4c72044eafa587.svg";

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b4d4749ed2f9a3523a77749d41159a59.svg";

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ab77c41fd83e3ac7b59824eedcc7c5a7.svg";

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f75018cb835783dfc8cba05679925db6.svg";

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "66214fa72aa58ed3471cf5db8dcfb73c.svg";

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6e931c35578a6f5cd2631a8035edc6c4.svg";

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ca7eed0e443dfbb1778393a05ff98533.svg";

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b798241c027f3433267b5fd2c7e162f4.svg";

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7227aa2d41f33d2dda795451b732f606.svg";

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "731e1923bcc41297de5b17335c6a088b.svg";

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6fd77ccb71c445a69ecda1d7f2acf3be.svg";

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "d0808ee85e6f2aa9923a2c02c855d3aa.svg";

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e8a6d2add179be4126a5236f96b2af5b.svg";

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "65e77feca458643bf95b5c5e13148726.svg";

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2406acaef2f238d3504430eb7bcb9d95.svg";

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8ab8f4f9840301eff71e1b84c08f1fda.svg";

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "35cac077905e5c012fb5502a2acf0407.svg";

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6d7f6fa1372c8c9c27c2b2d6d0ecdb87.svg";

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "99203386ec5edc719c3a8f3c790aedec.svg";

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ccb6040d000ff031a35680692a0c6521.svg";

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "30d9d46ebd8ed96acef4182f0e5dea5d.svg";

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "01aa50632e4ce254ff1abf10f815b2fa.svg";

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "514455ffe1d2fc47050b3448b6c47304.svg";

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8d6532733a5ffa657ae1df67a81fda1a.svg";

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(220);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(222)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./SelectionIcon.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./SelectionIcon.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(221)();
	// imports


	// module
	exports.push([module.id, ".selection-icon {\n  display: block;\n  position: relative;\n  padding: 0;\n  line-height: normal;\n  margin-right: .1em;\n  cursor: pointer;\n  vertical-align: middle;\n  text-align: center;\n  overflow: visible;\n  border: 1px solid #ccc;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  width: 24px;\n  height: 24px;\n  padding: 2px;\n}\n.selection-icon:hover {\n  border: 1px solid #fbcb09;\n  background: #fdf5ce 50% 50% repeat-x;\n  font-weight: bold;\n  color: #c77405;\n}\n.jquery-ui-like-button {\n  display: block;\n  position: relative;\n  padding: 0;\n  line-height: normal;\n  margin-right: .1em;\n  cursor: pointer;\n  vertical-align: middle;\n  text-align: center;\n  overflow: visible;\n}\n.rounded-corners {\n  border: 1px solid #ccc;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.right-dimensions {\n  width: 24px;\n  height: 24px;\n  padding: 2px;\n}\n", ""]);

	// exports


/***/ },
/* 221 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 223 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(225);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(222)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./ContainerLayout.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./ContainerLayout.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(221)();
	// imports


	// module
	exports.push([module.id, "#gxaAnatomogramWrapper {\n  display: block;\n  zoom: 1;\n  position: relative;\n  overflow: hidden;\n  marginLeft: 270px;\n}\n#gxaAnatomogramWrapper:after {\n  content: \" \";\n  display: block;\n  font-size: 0;\n  height: 0;\n  clear: both;\n  visibility: hidden;\n}\n#gxaAnatomogramAside {\n  float: left;\n  max-width: 270px;\n}\n.clearfix {\n  display: block;\n  zoom: 1;\n}\n.clearfix:after {\n  content: \" \";\n  display: block;\n  font-size: 0;\n  height: 0;\n  clear: both;\n  visibility: hidden;\n}\n", ""]);

	// exports


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var idsForSvgs = __webpack_require__(175);
	var svgsForSpecies = __webpack_require__(174);
	var getSvgsForSpecies = __webpack_require__(166).GetSvgsForSpecies;
	var AnatomogramFactory = __webpack_require__(2);

	var DemoComponent = React.createClass({
	    displayName: "DemoComponent",

	    propTypes: {
	        // onOntologyIdIsUnderFocus: React.PropTypes.func.isRequired,
	        ontologyIdsForChosenSpecies: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
	    },

	    getInitialState: function getInitialState() {
	        return { ontologyIdsUnderFocus: [] };
	    },


	    // componentDidUpdate: function(){
	    //     // this.props.onOntologyIdIsUnderFocus(this.state.ontologyIdsUnderFocus);
	    // },

	    render: function render() {
	        return React.createElement(
	            "div",
	            { style: { backgroundColor: "beige", minHeight: "280px", maxWidth: "450px" } },
	            React.createElement(
	                "p",
	                null,
	                "Currently hovered in anatomogram:"
	            ),
	            this.props.ontologyIdsToHighlight.length ? React.createElement(
	                "ul",
	                null,
	                this.props.ontologyIdsToHighlight.map(function (el) {
	                    return React.createElement(
	                        "li",
	                        { key: el },
	                        el
	                    );
	                })
	            ) : React.createElement(
	                "span",
	                null,
	                "None"
	            )
	        );
	    }
	});

	var DemoContainer = React.createClass({
	    displayName: "DemoContainer",

	    propTypes: {
	        species: React.PropTypes.string.isRequired
	    },

	    _getOntologyIdsForChosenSpecies: function _getOntologyIdsForChosenSpecies() {
	        return [].concat.apply([], getSvgsForSpecies('', this.props.species).map(function (el) {
	            return el.ids;
	        })).filter(function (el, ix, self) {
	            return self.indexOf(el) === ix;
	        }) // uniq
	        .sort();
	    },
	    getInitialState: function getInitialState() {
	        return { showAll: false, idsExpressedInExperiment: this._getOntologyIdsForChosenSpecies().filter(function () {
	                return Math.random() > 0.7;
	            }) };
	    },
	    render: function render() {
	        var _this = this;

	        var anatomogramConfig = {
	            pathToFolderWithBundledResources: "../dist/",
	            anatomogramData: {
	                species: this.props.species,
	                allSvgPathIds: this.state.showAll ? undefined : this.state.idsExpressedInExperiment
	            },
	            expressedTissueColour: "red",
	            hoveredTissueColour: "purple",
	            idsExpressedInExperiment: this.state.idsExpressedInExperiment
	        };

	        var Wrapped = AnatomogramFactory.wrapComponent(anatomogramConfig, DemoComponent, { ontologyIdsForChosenSpecies: this.state.idsExpressedInExperiment });

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                React.createElement("input", { type: "checkbox", checked: this.state.showAll, onChange: function onChange(ev) {
	                        _this.setState(function (previousState) {
	                            return {
	                                showAll: !previousState.showAll
	                            };
	                        });
	                    } }),
	                "Show all"
	            ),
	            React.createElement(
	                "p",
	                null,
	                "Ids selected in experiment:"
	            ),
	            this._getOntologyIdsForChosenSpecies().map(function (selectedId) {
	                return React.createElement(
	                    "span",
	                    { key: selectedId },
	                    React.createElement("input", { type: "checkbox", checked: _this.state.idsExpressedInExperiment.indexOf(selectedId) > -1, onChange: function onChange(ev) {
	                            _this.setState(function (previousState) {
	                                return {
	                                    idsExpressedInExperiment: previousState.idsExpressedInExperiment.includes(selectedId) ? previousState.idsExpressedInExperiment.filter(function (el) {
	                                        return el !== selectedId;
	                                    }) : previousState.idsExpressedInExperiment.concat([selectedId])
	                                };
	                            });
	                        } }),
	                    selectedId
	                );
	            }),
	            React.createElement(Wrapped, null)
	        );
	    }
	});

	var Demo = React.createClass({
	    displayName: "Demo",
	    getInitialState: function getInitialState() {
	        return { species: "gallus gallus" };
	    },
	    handleChange: function handleChange(event) {
	        this.setState({ species: event.target.value });
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "h2",
	                null,
	                "Expression Atlas Anatomogram"
	            ),
	            React.createElement(
	                "div",
	                null,
	                " Select species"
	            ),
	            React.createElement(
	                "select",
	                { value: this.state.species, onChange: this.handleChange },
	                Object.keys(svgsForSpecies).map(function (species) {
	                    return React.createElement(
	                        "option",
	                        { key: species, value: species },
	                        species
	                    );
	                })
	            ),
	            React.createElement("br", null),
	            React.createElement(DemoContainer, { species: this.state.species })
	        );
	    }
	});

	module.exports = Demo;

/***/ }
]);