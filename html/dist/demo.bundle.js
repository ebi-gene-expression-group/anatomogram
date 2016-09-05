var demo =
webpackJsonp_name_([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//*------------------------------------------------------------------*

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(162);

	//*------------------------------------------------------------------*


	//*------------------------------------------------------------------*

	module.exports = function (mountNode) {
	    ReactDOM.render(React.createElement(__webpack_require__(216), {}), mountNode);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//*------------------------------------------------------------------*

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var validate = __webpack_require__(159);
	var Anatomogram = __webpack_require__(160);
	var getSvgsForSpecies = __webpack_require__(181);
	__webpack_require__(214);

	//*------------------------------------------------------------------*
	var argumentShape = {
	  pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
	  anatomogramData: React.PropTypes.shape({
	    species: React.PropTypes.string.isRequired,
	    allSvgPathIds: React.PropTypes.arrayOf(React.PropTypes.string) //if not provided, we use properties read in from the file
	    /** There may also be other properties sent for compatibility with the older widget.*/
	  }).isRequired,
	  expressedTissueColour: React.PropTypes.string.isRequired,
	  hoveredTissueColour: React.PropTypes.string.isRequired,
	  eventEmitter: React.PropTypes.object
	};

	var _availableAnatomograms = function _availableAnatomograms(species, pathToFolderWithBundledResources, allSvgPathIds) {
	  return getSvgsForSpecies(species, pathToFolderWithBundledResources).filter(function (e) {
	    return !allSvgPathIds || allSvgPathIds.filter(function (id) {
	      return e.ids.indexOf(id) > -1;
	    }).length > 0;
	  });
	};

	var callEmitterWhenMousedOverTissuesChange = function callEmitterWhenMousedOverTissuesChange(eventEmitter) {
	  var forEachXNotInYsEmit = function forEachXNotInYsEmit(xs, ys, eventName) {
	    xs.filter(function (id) {
	      return ys.indexOf(id) == -1;
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
	  }, args.anatomogramData.allSvgPathIds ? { allSvgPathIds: allSvgPathIds } : {})) : null;
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
	        React.createElement(ComponentClass, _extends({
	          ontologyIdsToHighlight: this.props.ontologyIdsToHighlight,
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
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { id: 'gxaAnatomogramAside' },
	          createAnatomogram(Object.assign({}, anatomogramConfig, {
	            idsToBeHighlighted: this.state.ontologyIdsForComponentContentUnderFocus,
	            whenMousedOverIdsChange: function (nextIds, previousIds) {
	              this.setState({ ontologyIdsForAnatomogramContentUnderFocus: nextIds });
	            }.bind(this)
	          }))
	        ),
	        React.createElement(Wrapped, { componentProps: componentProps,
	          onOntologyIdIsUnderFocus: function (selectedIdOrIds) {
	            this.setState({ ontologyIdsForComponentContentUnderFocus: selectedIdOrIds ? typeof selectedIdOrIds === 'string' ? [selectedIdOrIds] : selectedIdOrIds : [] });
	          }.bind(this),
	          ontologyIdsToHighlight: this.state.ontologyIdsForAnatomogramContentUnderFocus })
	      );
	    }
	  });
	};

	//*------------------------------------------------------------------*
	module.exports = { "create": createAnatomogram, "wrapComponent": wrapComponentWithAnatomogram };

/***/ },
/* 2 */,
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
/* 159 */
/***/ function(module, exports) {

	/**
	 * @param {Object} object to be validated
	 * @param {Object} propTypes object with defined prop types
	 * @param {Boolean} _throw if set to true, invalid prop types will throw
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = check;

	function check(object, propTypes, _throw) {
	    var propName = undefined;

	    for (propName in propTypes) {
	        if (propTypes.hasOwnProperty(propName)) {
	            var error = propTypes[propName](object, propName, JSON.stringify(object), 'prop');
	            if (error) {
	                if (_throw) {
	                    throw error;
	                } else {
	                    console.error(error.message);
	                }
	            }
	        }
	    }
	}

	module.exports = exports['default'];

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//*------------------------------------------------------------------*

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);

	var AnatomogramImage = __webpack_require__(161);
	var SelectionIcon = __webpack_require__(164);
	var idsForSvgs = __webpack_require__(180);

	//*------------------------------------------------------------------*

	var Anatomogram = React.createClass({
	  displayName: 'Anatomogram',

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
	    return {
	      selectedType: this.props.availableAnatomograms[0].type
	    };
	  },

	  render: function render() {
	    function containsHuman(str) {
	      return str.indexOf("human") > -1;
	    }

	    return React.createElement(
	      'div',
	      { className: 'gxaAnatomogram', style: { display: "table", paddingTop: "4px" } },
	      React.createElement(
	        'div',
	        { style: { display: "table-row" } },
	        React.createElement(
	          'div',
	          { style: { display: "table-cell", verticalAlign: "top" } },
	          this._anatomogramSelectImageButtons()
	        ),
	        React.createElement(AnatomogramImage, _extends({
	          key: this.state.selectedType,
	          ref: 'currentImage',
	          file: this._selectedAnatomogram().path,
	          allSvgPathIds: this.props.allSvgPathIds || this._selectedAnatomogram().ids
	        }, this.props))
	      )
	    );
	  },

	  _anatomogramSelectImageButtons: function _anatomogramSelectImageButtons() {
	    return this.props.availableAnatomograms.length < 2 ? [] : this.props.availableAnatomograms.map(function (availableAnatomogram) {
	      return React.createElement(SelectionIcon, {
	        key: availableAnatomogram.type + "_toggle",
	        pathToFolderWithBundledResources: this.props.pathToFolderWithBundledResources,
	        anatomogramType: availableAnatomogram.type,
	        selected: this.state.selectedType === availableAnatomogram.type,
	        onClick: function () {
	          this._afterUserSelectedAnatomogram(availableAnatomogram.type);
	        }.bind(this) });
	    }.bind(this));
	  },

	  _afterUserSelectedAnatomogram: function _afterUserSelectedAnatomogram(newSelectedType) {
	    if (newSelectedType !== this.state.selectedType) {
	      this.setState({ selectedType: newSelectedType });
	    }
	  },

	  _selectedAnatomogram: function _selectedAnatomogram() {
	    var type = this.state.selectedType;
	    return this.props.availableAnatomograms.filter(function (e, ix) {
	      return e.type === type;
	    }).concat({
	      type: "_",
	      path: "__invalid__.svg",
	      ids: []
	    })[0];
	  }

	});

	//*------------------------------------------------------------------*

	module.exports = Anatomogram;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//*------------------------------------------------------------------*

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(162);
	var validate = __webpack_require__(159);
	var Snap = __webpack_require__(163);

	//*------------------------------------------------------------------*

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

	var AnatomogramImageParts = React.createClass({
	  displayName: 'AnatomogramImageParts',

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
	    return { toDraw: [].concat(AnatomogramImageParts.idsThatShouldBeStronglyHighlighted(this.props).map(this._highlightStrongly), this.props.idsExpressedInExperiment.map(this._highlightSlightly), this.props.idsNotHighlighted.map(this._highlightAsBackground)) };
	  },

	  render: function render() {
	    return React.createElement('span', null);
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
	    if (!arraysEqual(nextProps.idsMousedOver, this.props.idsMousedOver)) {
	      this.props.whenMousedOverIdsChange(nextProps.idsMousedOver, this.props.idsMousedOver);
	    }
	    var oldStrong = AnatomogramImageParts.idsThatShouldBeStronglyHighlighted(this.props);
	    var newStrong = AnatomogramImageParts.idsThatShouldBeStronglyHighlighted(nextProps);
	    var oldWeak = this.props.idsExpressedInExperiment;
	    var newWeak = nextProps.idsExpressedInExperiment;

	    var toDraw = [].concat(
	    //ids that heatmap wants highlighted are the most highlighted
	    newStrong.filter(function (id) {
	      return oldStrong.indexOf(id) < 0;
	    }).map(this._highlightStrongly),
	    //ids that are expressed in the experiment are highlighted with a weaker colour, often the same as background
	    newWeak.filter(function (id) {
	      return newStrong.indexOf(id) < 0;
	    }).filter(function (id) {
	      return oldWeak.indexOf(id) < 0;
	    }.bind(this)).map(this._highlightSlightly), nextProps.idsNotHighlighted.filter(function (id) {
	      return this.props.idsNotHighlighted.indexOf(id) < 0;
	    }.bind(this)).map(this._highlightAsBackground));

	    this.setState({ toDraw: toDraw });
	  },

	  statics: {
	    idsThatShouldBeStronglyHighlighted: function idsThatShouldBeStronglyHighlighted(properties) {
	      return properties.idsHeatmapWantsHighlighted.concat(properties.idsMousedOver);
	    }
	  }
	});

	var AnatomogramImage = React.createClass({
	  displayName: 'AnatomogramImage',

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
	    return {
	      mousedOverSvgIds: []
	    };
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
	    var svg = Snap(ReactDOM.findDOMNode(this.refs.anatomogram)).select("#LAYER_EFO");
	    if (svg !== null) {
	      this._drawOnSvg(svg, this.refs.imageParts.state.toDraw);
	      this.refs.imageParts.setState({ toDraw: [] });
	    }
	  },
	  _drawInitialLayout: function _drawInitialLayout(svg) {
	    if (this.refs.imageParts) {
	      this._drawOnSvg(svg, this.refs.imageParts.getInitialState().toDraw);
	      this.refs.imageParts.setState({ toDraw: [] });
	    } else {
	      //Possibly the other component has not loaded yet so there are no refs.
	      //Interminnently throws an error in the console.
	    }
	  },

	  _drawOnSvg: function _drawOnSvg(svg, instructions) {
	    instructions.forEach(function (instruction) {
	      this._highlightOrganismParts(svg, instruction.id, instruction.colour, instruction.opacity);
	    }.bind(this));
	  },

	  render: function render() {
	    var idsExpressedInExperiment = [],
	        idsHoveredOver = [],
	        idsHeatmapWantsHighlighted = [],
	        idsNotHighlighted = [];

	    for (var i = 0; i < this.props.allSvgPathIds.length; i++) {
	      var id = this.props.allSvgPathIds[i];
	      if (this.state.mousedOverSvgIds.indexOf(id) > -1) {
	        idsHoveredOver.push(id);
	      } else if (this.props.idsToBeHighlighted.indexOf(id) > -1) {
	        idsHeatmapWantsHighlighted.push(id);
	      } else if (this.props.idsExpressedInExperiment.indexOf(id) > -1) {
	        idsExpressedInExperiment.push(id);
	      } else {
	        idsNotHighlighted.push(id);
	      }
	    }
	    return React.createElement(
	      'span',
	      null,
	      React.createElement('svg', { ref: 'anatomogram', style: { display: "table-cell", width: "230px", height: this.props.height + "px" } }),
	      React.createElement(AnatomogramImageParts, { ref: 'imageParts', key: this.props.file,
	        idsExpressedInExperiment: idsExpressedInExperiment,
	        idsHeatmapWantsHighlighted: idsHeatmapWantsHighlighted,
	        idsMousedOver: idsHoveredOver,
	        idsNotHighlighted: idsNotHighlighted,
	        expressedTissueColour: this.props.expressedTissueColour,
	        hoveredTissueColour: this.props.hoveredTissueColour,
	        whenMousedOverIdsChange: this.props.whenMousedOverIdsChange })
	    );
	  },

	  _highlightPath: function _highlightPath(svgPathId) {
	    this.setState({ hoveredPathId: svgPathId });
	  },

	  _loadAnatomogram: function _loadAnatomogram(svgFile) {

	    var svgCanvas = Snap(ReactDOM.findDOMNode(this.refs.anatomogram)),
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
	        var heightTranslate = svgCanvas.node.clientHeight - 15;
	        var widthTranslate = svgCanvas.node.clientWidth / 2 - 40;
	        img.transform("t" + widthTranslate + "," + heightTranslate);
	        svgCanvas.append(img);
	      }
	    });
	  },

	  _registerHoverEvents: function _registerHoverEvents(svg) {
	    if (svg) {
	      // Sometimes svg is null... why?
	      var mouseoverCallback = function (svgPathId) {
	        this.setState(function (previousState, currentProps) {
	          var a = [].concat(previousState.mousedOverSvgIds);
	          a.push(svgPathId);
	          while (a.length > 5) {
	            a.shift();
	          }
	          return { mousedOverSvgIds: a };
	        });
	      }.bind(this);
	      var mouseoutCallback = function (svgPathId) {
	        this.setState(function (previousState, currentProps) {
	          var a = previousState.mousedOverSvgIds.map(function (el) {
	            return el === svgPathId ? "" : el;
	          });
	          return { mousedOverSvgIds: a };
	        });
	      }.bind(this);

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

	      this.props.allSvgPathIds.forEach(function (svgPathId) {
	        var svgElement = svg.select("#" + svgPathId);
	        attachCallbacks(svgElement, svgPathId);
	        if (svgElement && svgElement.type === "use") {
	          attachCallbacks(svg.select(svgElement.node.getAttribute("xlink:href")), svgPathId);
	        }
	      }, this);
	    }
	  },

	  _highlightOrganismParts: function _highlightOrganismParts(svg, svgPathId, colour, opacity) {
	    var el = svg.select("#" + svgPathId);
	    if (el && el.type === "use") {
	      AnatomogramImage._recursivelyChangeProperties(svg.select(el.node.getAttribute("xlink:href")), colour, opacity);
	    }
	    AnatomogramImage._recursivelyChangeProperties(el, colour, opacity);
	  },

	  statics: {
	    _recursivelyChangeProperties: function _recursivelyChangeProperties(svgElement, colour, opacity) {
	      if (svgElement) {
	        svgElement.selectAll("*").forEach(function (innerElement) {
	          AnatomogramImage._recursivelyChangeProperties(innerElement);
	        });
	        svgElement.attr({ "fill": colour, "fill-opacity": opacity });
	      }
	    }
	  }
	});
	//*------------------------------------------------------------------*
	module.exports = AnatomogramImage;

/***/ },
/* 162 */,
/* 163 */,
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//*------------------------------------------------------------------*

	var React = __webpack_require__(2);

	__webpack_require__(165);

	//*------------------------------------------------------------------*

	var SelectionIcon = React.createClass({
	  displayName: 'SelectionIcon',

	  propTypes: {
	    pathToFolderWithBundledResources: React.PropTypes.string.isRequired,
	    anatomogramType: function anatomogramType(props, propName, componentName) {
	      if (propName === "anatomogramType") {
	        if (["brain", "female", "male", "whole_plant", "flower_parts"].indexOf(props[propName]) < 0) {
	          return new Error("Unknown type of anatomogram: " + props[propName]);
	        }
	      }
	      return "";
	    },
	    selected: React.PropTypes.bool.isRequired,
	    onClick: React.PropTypes.func.isRequired
	  },
	  render: function render() {
	    return React.createElement('img', { className: "selection-icon", onClick: this.props.onClick, src: this._selectionIcon() });
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return this.props.selected !== nextProps.selected;
	  },
	  _selectionIcon: function _selectionIcon() {
	    return (this.props.pathToFolderWithBundledResources ? this.props.pathToFolderWithBundledResources + "/" : "") + __webpack_require__(169)("./" + this.props.anatomogramType + "_" + (this.props.selected ? "selected" : "unselected") + ".png");
	  }
	});

	//*------------------------------------------------------------------*

	module.exports = SelectionIcon;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(166);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(168)(content, {});
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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(167)();
	// imports


	// module
	exports.push([module.id, ".selection-icon {\n  display: block;\n  position: relative;\n  padding: 0;\n  line-height: normal;\n  margin-right: .1em;\n  cursor: pointer;\n  vertical-align: middle;\n  text-align: center;\n  overflow: visible;\n  border: 1px solid #ccc;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  width: 24px;\n  height: 24px;\n  padding: 2px;\n}\n.selection-icon:hover {\n  border: 1px solid #fbcb09;\n  background: #fdf5ce 50% 50% repeat-x;\n  font-weight: bold;\n  color: #c77405;\n}\n.jquery-ui-like-button {\n  display: block;\n  position: relative;\n  padding: 0;\n  line-height: normal;\n  margin-right: .1em;\n  cursor: pointer;\n  vertical-align: middle;\n  text-align: center;\n  overflow: visible;\n}\n.rounded-corners {\n  border: 1px solid #ccc;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.right-dimensions {\n  width: 24px;\n  height: 24px;\n  padding: 2px;\n}\n", ""]);

	// exports


/***/ },
/* 167 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 168 */
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
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./brain_selected.png": 170,
		"./brain_unselected.png": 171,
		"./female_selected.png": 172,
		"./female_unselected.png": 173,
		"./flower_parts_selected.png": 174,
		"./flower_parts_unselected.png": 175,
		"./male_selected.png": 176,
		"./male_unselected.png": 177,
		"./whole_plant_selected.png": 178,
		"./whole_plant_unselected.png": 179
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
	webpackContext.id = 169;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cbe297d1ea7bf5aac3cfcd540c8be570.png";

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bc6cb140072af5b41e6dc150228f8735.png";

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3661376bad0ed63dd397d20227943739.png";

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f1a4ab676c0362ce2f16c8f25bd4f863.png";

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0a8a46f3670c36c03bc15a90db754a19.png";

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ad3370345bfd3369763a3f106f57dcb5.png";

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bc6d754760910043bb887ade6e598cd3.png";

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8c0597cbe1b70b385479fc347d5b83fa.png";

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "130a3f15fc96a7fa5e9ac4db73d9aa37.png";

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "568a8e809ccaac58b013552d275965f8.png";

/***/ },
/* 180 */
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
			"BTO_0001629",
			"CL_0000084",
			"CL_0000233",
			"CL_0000236",
			"CL_0000336",
			"CL_0000576",
			"CL_0000623",
			"CL_0000738",
			"EFO_0000298",
			"EFO_0000530",
			"EFO_0000849",
			"EFO_0005883",
			"EFO_0005891",
			"UBERON_0000004",
			"UBERON_0000007",
			"UBERON_0000014",
			"UBERON_0000029",
			"UBERON_0000178",
			"UBERON_0000310",
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
			"UBERON_0001135",
			"UBERON_0001153",
			"UBERON_0001155",
			"UBERON_0001255",
			"UBERON_0001264",
			"UBERON_0001301",
			"UBERON_0001637",
			"UBERON_0001723",
			"UBERON_0001736",
			"UBERON_0001831",
			"UBERON_0001870",
			"UBERON_0001871",
			"UBERON_0001876",
			"UBERON_0001981",
			"UBERON_0002037",
			"UBERON_0002046",
			"UBERON_0002048",
			"UBERON_0002079",
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002108",
			"UBERON_0002110",
			"UBERON_0002113",
			"UBERON_0002114",
			"UBERON_0002116",
			"UBERON_0002135",
			"UBERON_0002185",
			"UBERON_0002240",
			"UBERON_0002245",
			"UBERON_0002367",
			"UBERON_0002371",
			"UBERON_0002372",
			"UBERON_0003126",
			"UBERON_0007844",
			"UBERON_0014892",
			"UBERON_001621"
		],
		"human_brain.svg": [
			"EFO_0000530",
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
			"UBERON_0002021",
			"UBERON_0002037",
			"UBERON_0002038",
			"UBERON_0002148",
			"UBERON_0002245",
			"UBERON_0002285",
			"UBERON_0002360",
			"UBERON_0002363",
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
			"PO_0009005",
			"PO_0009047",
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
			"CL_0000336",
			"CL_0000576",
			"CL_0000623",
			"CL_0000738",
			"EFO_0000530",
			"EFO_0000849",
			"EFO_0000979",
			"EFO_000298",
			"EFO_0005883",
			"EFO_0005891",
			"UBERON_0000004",
			"UBERON_0000007",
			"UBERON_0000029",
			"UBERON_0000178",
			"UBERON_0000310",
			"UBERON_0000451",
			"UBERON_0000945",
			"UBERON_0000947",
			"UBERON_0000948",
			"UBERON_0000955",
			"UBERON_0000956",
			"UBERON_0000966",
			"UBERON_0000970",
			"UBERON_0000977",
			"UBERON_0000995",
			"UBERON_0000996",
			"UBERON_0001013",
			"UBERON_0001021",
			"UBERON_0001043",
			"UBERON_0001044",
			"UBERON_0001052",
			"UBERON_0001103",
			"UBERON_0001135",
			"UBERON_0001153",
			"UBERON_0001155",
			"UBERON_0001255",
			"UBERON_0001264",
			"UBERON_0001295",
			"UBERON_0001621",
			"UBERON_0001621_",
			"UBERON_0001637",
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
			"UBERON_0002106",
			"UBERON_0002107",
			"UBERON_0002108",
			"UBERON_0002110",
			"UBERON_0002113",
			"UBERON_0002114",
			"UBERON_0002116",
			"UBERON_0002135",
			"UBERON_0002185",
			"UBERON_0002245",
			"UBERON_0002371",
			"UBERON_0002372",
			"UBERON_0003134",
			"UBERON_0003889",
			"UBERON_0007844",
			"UBERON_0014892"
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
		"sorghum_bicolor_flower_parts.svg": [
			"PO_0009001",
			"PO_0009009",
			"PO_0009030",
			"PO_0009049",
			"PO_0009051",
			"PO_0009066",
			"PO_0009089"
		],
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
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//*------------------------------------------------------------------*

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var svgsForSpecies = __webpack_require__(182);
	var idsForSvgs = __webpack_require__(180);

	//*------------------------------------------------------------------*

	//Using Ensembl and Ensembl Plants species


	var _anatomogramFile = function _anatomogramFile(path, pathToFolderWithBundledResources) {
	  return pathToFolderWithBundledResources + "/" + __webpack_require__(183)("./" + path);
	};

	var getSvgsForSpecies = function getSvgsForSpecies(species, pathToFolderWithBundledResources) {
	  var v = svgsForSpecies[species];
	  var result = [];
	  if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
	    for (var anatomomogramType in v) {
	      if (v.hasOwnProperty(anatomomogramType)) {
	        result.push({
	          type: anatomomogramType,
	          path: _anatomogramFile(v[anatomomogramType], pathToFolderWithBundledResources),
	          ids: idsForSvgs[v[anatomomogramType]]
	        });
	      }
	    }
	  } else if (typeof v === 'string') {
	    result.push({
	      type: "svg",
	      path: _anatomogramFile(v, pathToFolderWithBundledResources),
	      ids: idsForSvgs[v]
	    });
	  }
	  return result;
	};

	//*------------------------------------------------------------------*

	module.exports = getSvgsForSpecies;

/***/ },
/* 182 */
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
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./anolis_carolinensis.svg": 184,
		"./arabidopsis_thaliana_whole_plant.svg": 185,
		"./brachypodium_distachyon_flower_parts.svg": 186,
		"./brachypodium_distachyon_whole_plant.svg": 187,
		"./chicken.svg": 188,
		"./cow.svg": 189,
		"./hordeum_vulgare_flower_parts.svg": 190,
		"./hordeum_vulgare_whole_plant.svg": 191,
		"./human_brain.svg": 192,
		"./human_female.svg": 193,
		"./human_male.svg": 194,
		"./macaca_mulatta.svg": 195,
		"./monodelphis_domestica.svg": 196,
		"./mouse_brain.svg": 197,
		"./mouse_female.svg": 198,
		"./mouse_male.svg": 199,
		"./oryza_sativa_flower_parts.svg": 200,
		"./oryza_sativa_whole_plant.svg": 201,
		"./papio_anubis.svg": 202,
		"./rat.svg": 203,
		"./solanum_lycopersicum_flower_parts.svg": 204,
		"./solanum_lycopersicum_whole_plant.svg": 205,
		"./sorghum_bicolor_flower_parts.svg": 206,
		"./sorghum_bicolor_whole_plant.svg": 207,
		"./tetraodon_nigroviridis.svg": 208,
		"./triticum_aestivum_flower_parts.svg": 209,
		"./triticum_aestivum_whole_plant.svg": 210,
		"./xenopus_tropicalis.svg": 211,
		"./zea_mays_flower_parts.svg": 212,
		"./zea_mays_whole_plant.svg": 213
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
	webpackContext.id = 183;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "d4f2faae30c82fadfc3053398cedfcc3.svg";

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "604e65461f2a6d4fc231eb435d40ee58.svg";

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "75a898047075502bff21398804fc60e5.svg";

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "91e2680953f27b672ba45555bae71b8d.svg";

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "66401d1726702771c68e715a21aa37ba.svg";

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5eed91d49e1c6b3ff63352dbcca7faaa.svg";

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f3a50848d6458a24def1599a7a7a33de.svg";

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2dd35ae6a33f46c318ad80c19916b29f.svg";

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "524de2a0d42f1577719519ba507a401a.svg";

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e08451bc8b2e7e0733e425b19f5d8c8c.svg";

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "e9dedfa52d3356c3ba0f9afaecaf7b18.svg";

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "097f31a31e8ba421dd6da96d521d17b5.svg";

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "07e71c8c46cb1b5eae0b12d587a86a43.svg";

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "aa4ef824eaed1e1abea77d07ff33a371.svg";

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "d0a85005fa6535fcec634644187f8767.svg";

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "48f870d0cfec9d6ce5b80ead4bf8942b.svg";

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a151f68f377b4df79657e07d835805cc.svg";

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b3872347c05611f7ad065b5b8ed2c903.svg";

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "27bec93fbcbe19d54c12371437d42df8.svg";

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b5a56326206cb4cf343b712fc84bc261.svg";

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a049915c834b500015fa1774d10577e7.svg";

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "babbd4bcb4a6794a612c21fd0b744003.svg";

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "106a6ac98486b17e3b83c9e7309400ae.svg";

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "488238c1c25f9065e3a2dc3f58d870cf.svg";

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bb6b3ef52e59607e1d294c23dcbde340.svg";

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "718094f8e158b3f3233b01e677846b1b.svg";

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ec05430fc533ca4bf94425b2d114d127.svg";

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "54cc23258e21382adcde1829b3d418e0.svg";

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "af2b2dfdafd2179e634d16725fe3caae.svg";

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "acaba803aa857d1f495724aa139f341f.svg";

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(215);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(168)(content, {});
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
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(167)();
	// imports


	// module
	exports.push([module.id, "#gxaAnatomogramWrapper {\n  display: block;\n  zoom: 1;\n  position: relative;\n  overflow: hidden;\n  marginLeft: 270px;\n}\n#gxaAnatomogramWrapper:after {\n  content: \" \";\n  display: block;\n  font-size: 0;\n  height: 0;\n  clear: both;\n  visibility: hidden;\n}\n#gxaAnatomogramAside {\n  float: left;\n  max-width: 270px;\n}\n.clearfix {\n  display: block;\n  zoom: 1;\n}\n.clearfix:after {\n  content: \" \";\n  display: block;\n  font-size: 0;\n  height: 0;\n  clear: both;\n  visibility: hidden;\n}\n", ""]);

	// exports


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(162);

	//*------------------------------------------------------------------*

	var idsForSvgs = __webpack_require__(180);
	var svgsForSpecies = __webpack_require__(182);
	var getSvgsForSpecies = __webpack_require__(181);
	var AnatomogramFactory = __webpack_require__(1);
	//*------------------------------------------------------------------*
	var DemoComponent = React.createClass({
	  displayName: 'DemoComponent',

	  propTypes: {
	    onOntologyIdIsUnderFocus: React.PropTypes.func.isRequired,
	    ontologyIdsToHighlight: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      ontologyIdsUnderFocus: []
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.props.onOntologyIdIsUnderFocus(this.state.ontologyIdsUnderFocus);
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { style: { backgroundColor: "beige", minHeight: "280px", maxWidth: "450px" } },
	      React.createElement(
	        'h4',
	        null,
	        ' A demo component stubbing out the heatmap '
	      ),
	      React.createElement(
	        'div',
	        null,
	        ' ',
	        React.createElement(
	          'i',
	          null,
	          'Select of one or more ontologyIds- corresponds to hover events in heatmap'
	        )
	      ),
	      React.createElement(
	        'select',
	        { style: { height: '100px' }, multiple: true, value: this.state.ontologyIdsUnderFocus,
	          onChange: function (ev) {
	            var selectedId = ev.target.value;
	            this.setState(function (previousState) {
	              return {
	                ontologyIdsUnderFocus: previousState.ontologyIdsUnderFocus.indexOf(selectedId) > -1 ? previousState.ontologyIdsUnderFocus.filter(function (el) {
	                  return el !== selectedId;
	                }) : previousState.ontologyIdsUnderFocus.concat([selectedId])
	              };
	            });
	          }.bind(this) },
	        this.props.ontologyIdsForChosenSpecies.map(function (id) {
	          return React.createElement(
	            'option',
	            { key: id, value: id },
	            id
	          );
	        })
	      ),
	      React.createElement(
	        'p',
	        null,
	        ' Currently hovered in anatomogram: '
	      ),
	      this.props.ontologyIdsToHighlight.map(function (el) {
	        return React.createElement(
	          'span',
	          { key: el },
	          el
	        );
	      }),
	      this.props.ontologyIdsToHighlight.length ? null : "None"
	    );
	  }
	});

	var DemoContainer = React.createClass({
	  displayName: 'DemoContainer',

	  _getOntologyIdsForChosenSpecies: function _getOntologyIdsForChosenSpecies() {
	    return [].concat.apply([], getSvgsForSpecies(this.props.species).map(function (el) {
	      return el.ids;
	    })).filter(function uniq(el, ix, self) {
	      return self.indexOf(el) == ix;
	    }).sort();
	  },
	  getInitialState: function getInitialState() {
	    return {
	      idsExpressedInExperiment: this._getOntologyIdsForChosenSpecies().filter(function (e) {
	        return Math.random() > 0.7;
	      })
	    };
	  },
	  render: function render() {
	    var anatomogramConfig = {
	      pathToFolderWithBundledResources: "..",
	      anatomogramData: {
	        species: this.props.species
	      },
	      expressedTissueColour: "red",
	      hoveredTissueColour: "purple",
	      idsExpressedInExperiment: this.state.idsExpressedInExperiment
	    };
	    var Wrapped = AnatomogramFactory.wrapComponent(anatomogramConfig, DemoComponent, { ontologyIdsForChosenSpecies: this._getOntologyIdsForChosenSpecies() });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'p',
	        null,
	        ' Ids selected in experiment: '
	      ),
	      React.createElement(
	        'select',
	        { style: { height: '100px' }, multiple: true, value: this.state.idsExpressedInExperiment,
	          onChange: function (ev) {
	            var selectedId = ev.target.value;
	            this.setState(function (previousState) {
	              return {
	                idsExpressedInExperiment: previousState.idsExpressedInExperiment.indexOf(selectedId) > -1 ? previousState.idsExpressedInExperiment.filter(function (el) {
	                  return el !== selectedId;
	                }) : previousState.idsExpressedInExperiment.concat([selectedId])
	              };
	            });
	          }.bind(this) },
	        this._getOntologyIdsForChosenSpecies().map(function (id) {
	          return React.createElement(
	            'option',
	            { key: id, value: id },
	            id
	          );
	        })
	      ),
	      React.createElement(Wrapped, null)
	    );
	  }
	});

	var Demo = React.createClass({
	  displayName: 'Demo',


	  getInitialState: function getInitialState() {
	    return {
	      species: "gallus gallus"
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Expression Atlas Anatomogram '
	      ),
	      React.createElement(
	        'div',
	        null,
	        ' Select species'
	      ),
	      React.createElement(
	        'select',
	        { value: this.state.species, onChange: function (el) {
	            this.setState({ species: el.target.value });
	          }.bind(this) },
	        Object.keys(svgsForSpecies).map(function (species) {
	          return React.createElement(
	            'option',
	            { key: species, value: species },
	            species
	          );
	        })
	      ),
	      React.createElement('br', null),
	      React.createElement(DemoContainer, { species: this.state.species })
	    );
	  }
	});

	module.exports = Demo;

/***/ }
]);