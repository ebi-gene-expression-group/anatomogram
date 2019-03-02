var demo =
(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["demo"],{

/***/ "./html/AnatomogramDemo.js":
/*!*********************************!*\
  !*** ./html/AnatomogramDemo.js ***!
  \*********************************/
/*! exports provided: default, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnatomogramDemo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/index */ "./src/index.js");
/* harmony import */ var _src_json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/json/svgsMetadata.json */ "./src/json/svgsMetadata.json");
var _src_json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../src/json/svgsMetadata.json */ "./src/json/svgsMetadata.json", 1);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var unique = function unique(value, index, self) {
  return self.indexOf(value) === index;
};

var capitalizeFirstLetter = function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var allSpecies = _src_json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_4__.map(function (svgMetadata) {
  return svgMetadata.species;
}).filter(unique).sort();

var getAllIds = function getAllIds(species) {
  return _src_json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_4__.filter(function (svgMetadata) {
    return svgMetadata.species === species;
  }).reduce(function (acc, svgMetadata) {
    return acc.concat(svgMetadata.ids);
  }, []).filter(unique).sort();
};

var AnatomogramDemo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AnatomogramDemo, _React$Component);

  function AnatomogramDemo(props) {
    var _this;

    _classCallCheck(this, AnatomogramDemo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnatomogramDemo).call(this, props));
    var selectedSpecies = allSpecies.includes("homo_sapiens") ? "homo_sapiens" : allSpecies[0];
    _this.state = {
      selectedSpecies: selectedSpecies,
      allIds: getAllIds(selectedSpecies),
      showIds: [],
      highlightIds: [],
      selectIds: []
    };
    _this._handleSelectOnChange = _this._handleSelectOnChange.bind(_assertThisInitialized(_this));
    _this._handleCheckboxOnChange = _this._handleCheckboxOnChange.bind(_assertThisInitialized(_this));
    _this._handleOnClick = _this._handleOnClick.bind(_assertThisInitialized(_this));
    _this._addRemoveFromSelectIds = _this._addRemoveFromSelectIds.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AnatomogramDemo, [{
    key: "_handleSelectOnChange",
    value: function _handleSelectOnChange(event) {
      this.setState({
        selectedSpecies: event.target.value,
        allIds: getAllIds(event.target.value)
      });
    }
  }, {
    key: "_handleCheckboxOnChange",
    value: function _handleCheckboxOnChange(event, stateField) {
      var newShowIds = event.target.checked ? this.state[stateField].concat(event.target.value) : this.state[stateField].filter(function (id) {
        return event.target.value !== id;
      });
      this.setState(_defineProperty({}, stateField, newShowIds));
    }
  }, {
    key: "_handleOnClick",
    value: function _handleOnClick(allOrNone, stateField) {
      this.setState(_defineProperty({}, stateField, allOrNone ? Array.from(this.state.allIds) : []));
    }
  }, {
    key: "_addRemoveFromSelectIds",
    value: function _addRemoveFromSelectIds(ids) {
      this.setState({
        selectIds: Object(lodash__WEBPACK_IMPORTED_MODULE_5__["xor"])(this.state.selectIds, ids)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "small-3 small-centered columns"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        value: this.state.selectedSpecies,
        onChange: this._handleSelectOnChange
      }, [].concat(_toConsumableArray(allSpecies), ["foobar"]).map(function (species) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: species,
          value: species
        }, capitalizeFirstLetter(species.replace("_", " ")));
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "small-4 columns",
        id: "anatomogramContainer"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_index__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, {
        species: this.state.selectedSpecies,
        showIds: this.state.showIds,
        highlightIds: this.state.highlightIds,
        selectIds: this.state.selectIds,
        onClick: this._addRemoveFromSelectIds
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "small-8 columns"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "small-4 columns"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: function onClick() {
          _this2._handleOnClick(true, "showIds");
        }
      }, "Show all"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: function onClick() {
          _this2._handleOnClick(false, "showIds");
        }
      }, "Hide all")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "small-4 columns"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: function onClick() {
          _this2._handleOnClick(true, "highlightIds");
        }
      }, "Highlight all"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: function onClick() {
          _this2._handleOnClick(false, "highlightIds");
        }
      }, "Unhighlight all")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "small-4 columns"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: function onClick() {
          _this2._handleOnClick(true, "selectIds");
        }
      }, "Select all"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "button",
        onClick: function onClick() {
          _this2._handleOnClick(false, "selectIds");
        }
      }, "Unselect all"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row column"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Use the first checkbox to show the tissue, the second to highlight it, and the third to select it. Hover over a tissue to display its name. Click on it to select it.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row column"
      }, Array.from(this.state.allIds).sort().map(function (id) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: id,
          style: {
            display: "inline-block"
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "checkbox",
          name: "showIds",
          value: id,
          onChange: function onChange(e) {
            _this2._handleCheckboxOnChange(e, "showIds");
          },
          checked: _this2.state.showIds.includes(id)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "checkbox",
          name: "highlightIds",
          value: id,
          onChange: function onChange(e) {
            _this2._handleCheckboxOnChange(e, "highlightIds");
          },
          checked: _this2.state.highlightIds.includes(id)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "checkbox",
          name: "selectIds",
          value: id,
          onChange: function onChange(e) {
            _this2._handleCheckboxOnChange(e, "selectIds");
          },
          checked: _this2.state.selectIds.includes(id)
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, id));
      })))));
    }
  }]);

  return AnatomogramDemo;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

AnatomogramDemo.propTypes = {
  atlasUrl: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  pathToResources: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};

var render = function render(options, target) {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AnatomogramDemo, options), document.getElementById(target));
};



/***/ }),

/***/ "./src/Anatomogram.js":
/*!****************************!*\
  !*** ./src/Anatomogram.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Switcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Switcher */ "./src/Switcher.js");
/* harmony import */ var _AnatomogramSvg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnatomogramSvg */ "./src/AnatomogramSvg.js");
/* harmony import */ var _Assets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Assets */ "./src/Assets.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Anatomogram =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Anatomogram, _React$Component);

  function Anatomogram(props) {
    var _this;

    _classCallCheck(this, Anatomogram);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Anatomogram).call(this, props));
    _this.state = {
      selectedView: Object(_Assets__WEBPACK_IMPORTED_MODULE_4__["getDefaultView"])(props.species)
    };
    _this._switchAnatomogramView = _this._switchAnatomogramView.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Anatomogram, [{
    key: "_switchAnatomogramView",
    value: function _switchAnatomogramView(anatomogramView) {
      this.setState({
        selectedView: anatomogramView
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _Assets__WEBPACK_IMPORTED_MODULE_4__["supportedSpecies"].includes(this.props.species) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Switcher__WEBPACK_IMPORTED_MODULE_2__["default"], {
        atlasUrl: this.props.atlasUrl,
        species: this.props.species,
        selectedView: this.state.selectedView,
        onChangeView: this._switchAnatomogramView
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AnatomogramSvg__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
        atlasUrl: this.props.atlasUrl
      }, this.props, {
        selectedView: this.state.selectedView
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.species !== state.species) {
        return {
          species: props.species,
          selectedView: Object(_Assets__WEBPACK_IMPORTED_MODULE_4__["getDefaultView"])(props.species)
        };
      }

      return null;
    }
  }]);

  return Anatomogram;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Anatomogram.propTypes = {
  atlasUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  species: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
};
Anatomogram.defaultProps = {
  atlasUrl: "https://www.ebi.ac.uk/gxa/"
};
/* harmony default export */ __webpack_exports__["default"] = (Anatomogram);

/***/ }),

/***/ "./src/AnatomogramSvg.js":
/*!*******************************!*\
  !*** ./src/AnatomogramSvg.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! urijs */ "./node_modules/urijs/src/URI.js");
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-svg */ "./node_modules/react-svg/es/react-svg.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
var _this = undefined;

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: top;\n  width: 90%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var groupIntoPairs = function groupIntoPairs(arr, f) {
  return Object.entries(Object(lodash__WEBPACK_IMPORTED_MODULE_5__["groupBy"])(arr, f));
};

var getSvgElementById = function getSvgElementById(svgDomNode) {
  var getEfoLayerGroup = function getEfoLayerGroup(svgDomNode) {
    var svgGroups = svgDomNode.getElementsByTagName("g");

    for (var i = 0; i < svgGroups.length; i++) {
      if (svgGroups[i].id === "LAYER_EFO") {
        return svgGroups[i];
      }
    }
  };

  var efoLayerGroup = getEfoLayerGroup(svgDomNode);

  function _getSvgElementById(id) {
    if (efoLayerGroup) {
      for (var i = 0; i < efoLayerGroup.children.length; i++) {
        if (efoLayerGroup.children[i].id === id) {
          if (efoLayerGroup.children[i].attributes["xlink:href"]) {
            return _getSvgElementById(efoLayerGroup.children[i].attributes["xlink:href"].value.substring(1));
          } else {
            return efoLayerGroup.children[i];
          }
        }
      }
    }
  }

  return _getSvgElementById;
};

var paintSvgElement = function paintSvgElement(element, elementMarkup) {
  return element && elementMarkup && Object.assign(element.style, elementMarkup);
};

var registerEvent = function registerEvent(element, eventType, elementMarkup, callback) {
  element && element.addEventListener(eventType, function () {
    paintSvgElement(element, elementMarkup);
    callback();
  });
};

var initialiseSvgElements = function initialiseSvgElements(getSvgElementById, _ref) {
  var idsWithMarkup = _ref.idsWithMarkup,
      onMouseOver = _ref.onMouseOver,
      onMouseOut = _ref.onMouseOut,
      onClick = _ref.onClick;
  //More than one id can correspond to an element - see the svg "use" elements
  groupIntoPairs(idsWithMarkup.map(function (e) {
    return e.id;
  }).filter(function (e, ix, self) {
    return self.indexOf(e) === ix;
  }).map(function (id) {
    return [getSvgElementById(id), id];
  }), "[0].id").forEach(function (a) {
    var element = a[1][0][0];
    var ids = a[1].map(function (t) {
      return t[1];
    }); //Given an element and its ids, we take the first element of the idsWithMarkup array that is one of the ids

    var markupNormalAndUnderFocus = idsWithMarkup.find(function (m) {
      return ids.includes(m.id);
    });
    paintSvgElement(element, markupNormalAndUnderFocus.markupNormal);
    registerEvent(element, "mouseover", markupNormalAndUnderFocus.markupUnderFocus, onMouseOver.bind(_this, ids));
    registerEvent(element, "mouseout", markupNormalAndUnderFocus.markupNormal, onMouseOut.bind(_this, ids));
    registerEvent(element, "click", {}, onClick.bind(_this, ids));
  });
};

var loadSvg = function loadSvg(species, selectedView) {
  return __webpack_require__("./src/svg sync recursive ^\\.\\/.*\\.svg$")("./".concat(species).concat(selectedView ? ".".concat(selectedView) : "", ".svg"));
};

var resolve = function resolve(uri, baseUrl) {
  return urijs__WEBPACK_IMPORTED_MODULE_2___default()(uri).is("absolute") ? urijs__WEBPACK_IMPORTED_MODULE_2___default()(uri) : urijs__WEBPACK_IMPORTED_MODULE_2___default()(uri, baseUrl);
};

var AnatomogramSvgWrapperDiv = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject()); // ReactSVG loads the SVG file asynchronously (hence the callback prop). We don’t use componentDidUpdate or
// componentDidMount because they can’t guarantee that the SVG is already loaded when they’re run.

var AnatomogramSvg = function AnatomogramSvg(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AnatomogramSvgWrapperDiv, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_svg__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onInjected: function onInjected(error, svgDomNode) {
      if (error) {
        console.log("ReactSVG Error: ".concat(error));
      } else {
        initialiseSvgElements(getSvgElementById(svgDomNode), props);
      }

      props.onInjected(error, svgDomNode);
    },
    src: resolve(loadSvg(props.species, props.selectedView), props.atlasUrl).toString(),
    svgStyle: {
      width: "100%",
      height: "auto",
      paddingLeft: props.selectedView ? "10px" : ""
    }
  }));
};

AnatomogramSvg.propTypes = {
  atlasUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  species: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  selectedView: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  idsWithMarkup: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    markupNormal: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
    markupUnderFocus: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
  })).isRequired,
  onMouseOver: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onMouseOut: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onInjected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
AnatomogramSvg.defaultProps = {
  onInjected: function onInjected(error, svgDomNode) {}
};
/* harmony default export */ __webpack_exports__["default"] = (AnatomogramSvg);

/***/ }),

/***/ "./src/Assets.js":
/*!***********************!*\
  !*** ./src/Assets.js ***!
  \***********************/
/*! exports provided: getAnatomogramViews, getDefaultView, supportedSpecies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAnatomogramViews", function() { return getAnatomogramViews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultView", function() { return getDefaultView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportedSpecies", function() { return supportedSpecies; });
/* harmony import */ var _json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json/svgsMetadata.json */ "./src/json/svgsMetadata.json");
var _json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./json/svgsMetadata.json */ "./src/json/svgsMetadata.json", 1);


var unique = function unique(element, index, array) {
  return array.indexOf(element) === index;
};

var isNotBlank = function isNotBlank(str) {
  return typeof str === "string" && str.trim() !== "";
};

var supportedSpecies = _json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_0__.map(function (svgMetadata) {
  return svgMetadata.species;
}).filter(unique);
var multipleViewsSpecies = _json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_0__.filter(function (svgMetadata) {
  return svgMetadata.view !== "";
}).map(function (svgMetadata) {
  return svgMetadata.species;
}).filter(unique);
var anatomogramViews = multipleViewsSpecies.reduce(function (acc, species) {
  acc[species] = _json_svgsMetadata_json__WEBPACK_IMPORTED_MODULE_0__.filter(function (svgMetadata) {
    return svgMetadata.species === species;
  }).map(function (svgMetadata) {
    return svgMetadata.view;
  }).filter(isNotBlank).sort().reverse(); // The order we want is `male`, `female`, `brain` and `whole_plant`, `flower_parts` :)

  return acc;
}, {});

var getAnatomogramViews = function getAnatomogramViews(species) {
  if (supportedSpecies.includes(species)) {
    return anatomogramViews[species] || [];
  }
};

var getDefaultView = function getDefaultView(species) {
  if (supportedSpecies.includes(species)) {
    return getAnatomogramViews(species)[0] || null;
  }
};



/***/ }),

/***/ "./src/Main.js":
/*!*********************!*\
  !*** ./src/Main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var _Anatomogram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Anatomogram */ "./src/Anatomogram.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }






var arrayDifference = function arrayDifference(arr1, arr2) {
  return Array.isArray(arr1) && Array.isArray(arr2) ? arr1.filter(function (e) {
    return !arr2.includes(e);
  }) : arr1;
};

var elementMarkup = function elementMarkup(colour, opacity) {
  return {
    fill: colour,
    opacity: opacity
  };
};

var idsWithMarkupAccordingToCurrentColoringScheme = function idsWithMarkupAccordingToCurrentColoringScheme(_ref) {
  var showIds = _ref.showIds,
      showColour = _ref.showColour,
      showOpacity = _ref.showOpacity,
      highlightIds = _ref.highlightIds,
      highlightColour = _ref.highlightColour,
      highlightOpacity = _ref.highlightOpacity,
      selectIds = _ref.selectIds,
      selectColour = _ref.selectColour,
      selectOpacity = _ref.selectOpacity;
  var uniqueShowIds = arrayDifference(showIds, [].concat(_toConsumableArray(highlightIds), _toConsumableArray(selectIds)));
  var uniqueHighlightIds = arrayDifference(highlightIds, selectIds); //Given an element and its ids, we take the first element of this array having one of the ids

  return [].concat(selectIds.map(function (id) {
    return {
      id: id,
      markupNormal: elementMarkup(selectColour, selectOpacity),
      markupUnderFocus: elementMarkup(selectColour, selectOpacity + 0.2)
    };
  }), uniqueHighlightIds.map(function (id) {
    return {
      id: id,
      markupNormal: elementMarkup(highlightColour, highlightOpacity),
      markupUnderFocus: elementMarkup(highlightColour, highlightOpacity + 0.2)
    };
  }), uniqueShowIds.map(function (id) {
    return {
      id: id,
      markupNormal: elementMarkup(showColour, showOpacity),
      markupUnderFocus: elementMarkup(highlightColour, highlightOpacity + 0.2)
    };
  }));
};

var addColoringScheme = Object(recompose__WEBPACK_IMPORTED_MODULE_1__["compose"])(Object(recompose__WEBPACK_IMPORTED_MODULE_1__["defaultProps"])({
  showIds: [],
  highlightIds: [],
  selectIds: [],
  showColour: "grey",
  highlightColour: "red",
  selectColour: "purple",
  showOpacity: 0.4,
  highlightOpacity: 0.4,
  selectOpacity: 0.4
}), Object(recompose__WEBPACK_IMPORTED_MODULE_1__["withPropsOnChange"])(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["negate"])(lodash__WEBPACK_IMPORTED_MODULE_0__["isEqual"]), function (props) {
  return {
    idsWithMarkup: idsWithMarkupAccordingToCurrentColoringScheme(props)
  };
}));
var normaliseSpecies = Object(recompose__WEBPACK_IMPORTED_MODULE_1__["mapProps"])(function (props) {
  return Object.assign({}, props, {
    species: props.species.toLowerCase().replace(/ +/, "_")
  });
});
var addDefaultCallbacks = Object(recompose__WEBPACK_IMPORTED_MODULE_1__["defaultProps"])({
  onMouseOver: function onMouseOver() {},
  onMouseOut: function onMouseOut() {},
  onClick: function onClick() {}
});
var definePropTypes = Object(recompose__WEBPACK_IMPORTED_MODULE_1__["setPropTypes"])({
  atlasUrl: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired,
  species: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired,
  idsWithMarkup: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired,
    markupNormal: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
    markupUnderFocus: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired
  })).isRequired,
  onMouseOver: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
  onMouseOut: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired
});
var defineDefaultProps = Object(recompose__WEBPACK_IMPORTED_MODULE_1__["defaultProps"])({
  atlasUrl: "https://www.ebi.ac.uk/gxa/"
});
/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_1__["compose"])(addColoringScheme, recompose__WEBPACK_IMPORTED_MODULE_1__["onlyUpdateForPropTypes"], definePropTypes, defineDefaultProps, addDefaultCallbacks, normaliseSpecies)(_Anatomogram__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ }),

/***/ "./src/Switcher.js":
/*!*************************!*\
  !*** ./src/Switcher.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! urijs */ "./node_modules/urijs/src/URI.js");
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _Assets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Assets */ "./src/Assets.js");
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  width: 100%;\n  height: auto;\n  padding: 2px;\n\n  &:hover {\n    border: 1px solid orange;\n    background: lightgoldenrodyellow;\n    cursor: pointer;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: top;\n  width: 10%;\n  max-width: 44px;\n  line-height: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var loadIcon = function loadIcon(view, selectedView) {
  return __webpack_require__("./src/img sync recursive ^\\.\\/.*selected\\.png$")("./".concat(view, ".").concat(view === selectedView ? "" : "un", "selected.png"));
};

var resolve = function resolve(uri, baseUrl) {
  return urijs__WEBPACK_IMPORTED_MODULE_2___default()(uri).is("absolute") ? urijs__WEBPACK_IMPORTED_MODULE_2___default()(uri) : urijs__WEBPACK_IMPORTED_MODULE_2___default()(uri, baseUrl);
};

var IconWrapperDiv = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject());
var IconImg = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].img(_templateObject2());

var Switcher = function Switcher(_ref) {
  var atlasUrl = _ref.atlasUrl,
      species = _ref.species,
      selectedView = _ref.selectedView,
      onChangeView = _ref.onChangeView;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconWrapperDiv, null, Object(_Assets__WEBPACK_IMPORTED_MODULE_4__["getAnatomogramViews"])(species).map(function (view) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconImg, {
      key: view,
      onClick: function onClick() {
        return onChangeView(view);
      },
      src: resolve(loadIcon(view, selectedView), atlasUrl).toString()
    });
  }));
};

Switcher.propTypes = {
  atlasUrl: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  species: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  selectedView: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onChangeView: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
Switcher.defaultProps = {
  atlasUrl: "https://www.ebi.ac.uk/gxa/"
};
/* harmony default export */ __webpack_exports__["default"] = (Switcher);

/***/ }),

/***/ "./src/img sync recursive ^\\.\\/.*selected\\.png$":
/*!********************************************!*\
  !*** ./src/img sync ^\.\/.*selected\.png$ ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./brain.selected.png": "./src/img/brain.selected.png",
	"./brain.unselected.png": "./src/img/brain.unselected.png",
	"./female.selected.png": "./src/img/female.selected.png",
	"./female.unselected.png": "./src/img/female.unselected.png",
	"./flower_parts.selected.png": "./src/img/flower_parts.selected.png",
	"./flower_parts.unselected.png": "./src/img/flower_parts.unselected.png",
	"./male.selected.png": "./src/img/male.selected.png",
	"./male.unselected.png": "./src/img/male.unselected.png",
	"./whole_plant.selected.png": "./src/img/whole_plant.selected.png",
	"./whole_plant.unselected.png": "./src/img/whole_plant.unselected.png"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/img sync recursive ^\\.\\/.*selected\\.png$";

/***/ }),

/***/ "./src/img/brain.selected.png":
/*!************************************!*\
  !*** ./src/img/brain.selected.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cbe297d1ea7bf5aac3cfcd540c8be570.png";

/***/ }),

/***/ "./src/img/brain.unselected.png":
/*!**************************************!*\
  !*** ./src/img/brain.unselected.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bc6cb140072af5b41e6dc150228f8735.png";

/***/ }),

/***/ "./src/img/female.selected.png":
/*!*************************************!*\
  !*** ./src/img/female.selected.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a9cbc6e400cd961706ef5e528563fe6d.png";

/***/ }),

/***/ "./src/img/female.unselected.png":
/*!***************************************!*\
  !*** ./src/img/female.unselected.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "269274763eff686d3c27aece90a0c026.png";

/***/ }),

/***/ "./src/img/flower_parts.selected.png":
/*!*******************************************!*\
  !*** ./src/img/flower_parts.selected.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d0d56ff8bdb244712e9e483c6a639080.png";

/***/ }),

/***/ "./src/img/flower_parts.unselected.png":
/*!*********************************************!*\
  !*** ./src/img/flower_parts.unselected.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5aad6781bf1842d768e7d728adcf31a2.png";

/***/ }),

/***/ "./src/img/male.selected.png":
/*!***********************************!*\
  !*** ./src/img/male.selected.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fe374fbbda778cc8600ca3d2bbf49074.png";

/***/ }),

/***/ "./src/img/male.unselected.png":
/*!*************************************!*\
  !*** ./src/img/male.unselected.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5b8007512579bbcc4f34d45ac6349992.png";

/***/ }),

/***/ "./src/img/whole_plant.selected.png":
/*!******************************************!*\
  !*** ./src/img/whole_plant.selected.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "582c3f6d2f6e59c501473289851075dd.png";

/***/ }),

/***/ "./src/img/whole_plant.unselected.png":
/*!********************************************!*\
  !*** ./src/img/whole_plant.unselected.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3399d604b656023383db95baf7484d1e.png";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default, render, anatomogramSpecies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Main */ "./src/Main.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Main__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Assets */ "./src/Assets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "anatomogramSpecies", function() { return _Assets__WEBPACK_IMPORTED_MODULE_3__["supportedSpecies"]; });






var render = function render(options, target) {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Main__WEBPACK_IMPORTED_MODULE_2__["default"], options), document.getElementById(target));
};



/***/ }),

/***/ "./src/json/svgsMetadata.json":
/*!************************************!*\
  !*** ./src/json/svgsMetadata.json ***!
  \************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, default */
/***/ (function(module) {

module.exports = [{"filename":"anolis_carolinensis.svg","species":"anolis_carolinensis","view":"","ids":["UBERON_0000955","UBERON_0000948","UBERON_0002113","UBERON_0014892"]},{"filename":"arabidopsis_thaliana.svg","species":"arabidopsis_thaliana","view":"","ids":["PO_0025034","PO_0009005","PO_0009046","PO_0009001"]},{"filename":"bos_taurus.svg","species":"bos_taurus","view":"","ids":["UBERON_0001013","UBERON_0014892","UBERON_0002114","UBERON_0000955","UBERON_0002113","UBERON_0002048","UBERON_0001155","UBERON_0000948","UBERON_0002107","UBERON_0002016","UBERON_0001898"]},{"filename":"brachypodium_distachyon.flower_parts.svg","species":"brachypodium_distachyon","view":"flower_parts","ids":["PO_0009066","PO_0009030","PO_0009001","PO_0009009","PO_0009089"]},{"filename":"brachypodium_distachyon.whole_plant.svg","species":"brachypodium_distachyon","view":"whole_plant","ids":["PO_0009010","PO_0009049","PO_0025034"]},{"filename":"gallus_gallus.svg","species":"gallus_gallus","view":"","ids":["UBERON_0000955","UBERON_0000948","UBERON_0002113","UBERON_0002107","UBERON_0001155","UBERON_0002106","UBERON_0002048","UBERON_0014892"]},{"filename":"homo_sapiens.brain.svg","species":"homo_sapiens","view":"brain","ids":["UBERON_0002148","UBERON_0001894","UBERON_0001896","UBERON_0002771","UBERON_0002702","UBERON_0002021","UBERON_0001905","UBERON_0001897","UBERON_0001898","UBERON_0002421","UBERON_0003027","UBERON_0001876","UBERON_0001870","UBERON_0001871","UBERON_0001882","UBERON_0002285","UBERON_0001873","UBERON_0001872","UBERON_0002038","UBERON_0001874","UBERON_0001875","UBERON_0002360","UBERON_0000451","UBERON_0000956","UBERON_0002037","UBERON_0002363","UBERON_0001954","UBERON_0002245"]},{"filename":"homo_sapiens.female.svg","species":"homo_sapiens","view":"female","ids":["UBERON_0001981","UBERON_0000178","UBERON_0001637","CL_0000236","CL_0000084","CL_0000623","CL_0000576","CL_0000233","UBERON_0000966","UBERON_0001831","UBERON_0001013","UBERON_0000948","UBERON_0001135","UBERON_0000955","UBERON_0000310","UBERON_0002369","UBERON_0000029","UBERON_0001134","UBERON_0000992","CL_0000738","UBERON_0001044","UBERON_0003889","UBERON_0000995","UBERON_0000002","UBERON_0001021","UBERON_0006618","UBERON_0012249","UBERON_0002421","UBERON_0000977","UBERON_0002185","UBERON_0003126","UBERON_0002048","UBERON_0002372","UBERON_0000970","UBERON_0001876","UBERON_0001736","UBERON_0001264","UBERON_0002107","UBERON_0001155","UBERON_0002371","UBERON_0001255","UBERON_0000945","UBERON_0002114","UBERON_0001043","UBERON_0002110","UBERON_0002106","UBERON_0002108","UBERON_0001987","UBERON_0001295","UBERON_0000996","UBERON_0000947","UBERON_0000007","UBERON_0007650","UBERON_0001153","UBERON_0001154","UBERON_0002116","UBERON_0002079","UBERON_0002084","UBERON_0002146","UBERON_0002135","UBERON_0001103","UBERON_0002481","UBERON_0007844","UBERON_0000341","UBERON_0001052","UBERON_0001706","UBERON_0001728","UBERON_0002037","UBERON_0002245","UBERON_0000451","UBERON_0001870","UBERON_0000004","UBERON_0001871","UBERON_0000956","UBERON_0002113","UBERON_0001225","UBERON_0001621","UBERON_0002134","UBERON_0002046","UBERON_0000014","UBERON_0000167","UBERON_0001723"]},{"filename":"homo_sapiens.male.svg","species":"homo_sapiens","view":"male","ids":["UBERON_0000956","UBERON_0000977","UBERON_0000955","UBERON_0000948","UBERON_0000310","UBERON_0002369","UBERON_0000029","UBERON_0001013","UBERON_0001134","CL_0000738","UBERON_0001871","UBERON_0006618","UBERON_0001621","UBERON_0002421","UBERON_0001000","UBERON_0000998","UBERON_0000473","UBERON_0001301","UBERON_0000970","UBERON_0002372","UBERON_0002048","UBERON_0001876","UBERON_0003126","UBERON_0002185","UBERON_0001021","UBERON_0002037","UBERON_0002245","UBERON_0002113","UBERON_0001225","UBERON_0002046","UBERON_0002371","UBERON_0001870","UBERON_0000451","UBERON_0000007","UBERON_0000947","UBERON_0007650","UBERON_0002084","UBERON_0001153","UBERON_0002116","UBERON_0001052","UBERON_0000004","UBERON_0001723","UBERON_0002079","UBERON_0002146","UBERON_0002135","UBERON_0000989","UBERON_0001728","UBERON_0002240","UBERON_0000341","UBERON_0002134","UBERON_0001103","UBERON_0002107","UBERON_0000945","UBERON_0002106","UBERON_0002114","UBERON_0002110","UBERON_0001264","UBERON_0001155","UBERON_0002108","UBERON_0001154","UBERON_0001135","UBERON_0001255","UBERON_00024818","UBERON_0007844","UBERON_0001043","UBERON_0001044","UBERON_0001831","UBERON_0001736","UBERON_0000014","UBERON_0000178","UBERON_0001981","UBERON_0001637","CL_0000236","CL_0000084","CL_0000623","CL_0000576","CL_0000233","UBERON_0001954","UBERON_0000966","UBERON_0001706","UBERON_0000167","UBERON_0002367"]},{"filename":"hordeum_vulgare.flower_parts.svg","species":"hordeum_vulgare","view":"flower_parts","ids":["PO_0009001","PO_0009030","PO_0009073","PO_0009072","PO_0009009","PO_0009066"]},{"filename":"hordeum_vulgare.whole_plant.svg","species":"hordeum_vulgare","view":"whole_plant","ids":["PO_0020142","PO_0009005","PO_0009006","PO_0009049","PO_0025034"]},{"filename":"macaca_mulatta.svg","species":"macaca_mulatta","view":"","ids":["UBERON_0000955","UBERON_0000451","UBERON_0002037","UBERON_0000948","UBERON_0002113","UBERON_0002107","UBERON_0000473"]},{"filename":"monodelphis_domestica.svg","species":"monodelphis_domestica","view":"","ids":["UBERON_0000955","UBERON_0002037","UBERON_0000948","UBERON_0002113","UBERON_0002107","UBERON_0000473"]},{"filename":"mus_musculus.brain.svg","species":"mus_musculus","view":"brain","ids":["UBERON_0001896","UBERON_0000956","UBERON_0000369","UBERON_0001894","UBERON_0000007","UBERON_0002037","UBERON_0002298","UBERON_0001891","UBERON_0001897","UBERON_0001898","UBERON_0000004","UBERON_0002259","EFO_0000530"]},{"filename":"mus_musculus.female.svg","species":"mus_musculus","view":"female","ids":["UBERON_0000947","UBERON_0001009","UBERON_0001348","UBERON_0001347","UBERON_0000945","UBERON_0002114","UBERON_0001264","UBERON_0002106","UBERON_0002369","UBERON_0002113","UBERON_0001155","UBERON_0002108","UBERON_0001153","UBERON_0002115","UBERON_0002116","UBERON_0001043","UBERON_0002110","UBERON_0000996","UBERON_0000995","UBERON_0001255","UBERON_0001831","UBERON_0001736","UBERON_0001723","UBERON_0001211","UBERON_0000981","UBERON_0002371","UBERON_0007844","UBERON_0001377","UBERON_0014892","UBERON_0002240","UBERON_0001103","UBERON_0002103","UBERON_0001645","UBERON_0000970","UBERON_0001242","UBERON_0000955","UBERON_0000948","UBERON_0002107","UBERON_0001322","UBERON_0001981","UBERON_0000014","UBERON_0001911","UBERON_0003134","UBERON_0000990","UBERON_0000029","UBERON_0001132","UBERON_0002370","UBERON_0002046","UBERON_0002048","UBERON_0000010","UBERON_0003126"]},{"filename":"mus_musculus.male.svg","species":"mus_musculus","view":"male","ids":["UBERON_0000947","UBERON_0001348","UBERON_0001347","UBERON_0000945","UBERON_0002114","UBERON_0001264","UBERON_0002106","UBERON_0002369","UBERON_0002113","UBERON_0001155","UBERON_0002108","UBERON_0001153","UBERON_0002115","UBERON_0002116","UBERON_0001043","UBERON_0002110","UBERON_0001831","UBERON_0001736","UBERON_0000029","UBERON_0000998","UBERON_0000989","UBERON_0000981","UBERON_0002371","UBERON_0007844","UBERON_0001377","UBERON_0002240","UBERON_0002048","UBERON_0001103","UBERON_0003126","UBERON_0002103","UBERON_0001645","UBERON_0001322","UBERON_0001242","UBERON_0002107","UBERON_0000948","UBERON_0000955","UBERON_0014892","UBERON_0001009","UBERON_0001981","UBERON_0000014","UBERON_0001132","UBERON_0001211","UBERON_0002367","UBERON_0001000","UBERON_0001301","UBERON_0000473","UBERON_0001255","UBERON_0002370","UBERON_0000010","UBERON_0000970","UBERON_0001723"]},{"filename":"oryza_sativa.flower_parts.svg","species":"oryza_sativa","view":"flower_parts","ids":["PO_0009010","PO_0009009","PO_0009089","PO_0009030","PO_0009066"]},{"filename":"oryza_sativa.whole_plant.svg","species":"oryza_sativa","view":"whole_plant","ids":["PO_0025034","PO_0009005","PO_0009049","PO_0009006","PO_0005052"]},{"filename":"papio_anubis.svg","species":"papio_anubis","view":"","ids":["UBERON_0000948","UBERON_0002107","UBERON_0000945","UBERON_0001155","UBERON_0002371","UBERON_0002113","UBERON_0002106","UBERON_0014892","UBERON_0002370","UBERON_0000955","UBERON_0001871","UBERON_0001870","UBERON_0000007","UBERON_0002048","UBERON_0000029","UBERON_0002037"]},{"filename":"rattus_norvegicus.svg","species":"rattus_norvegicus","view":"","ids":["UBERON_0000955","UBERON_0002113","CL_0000336","UBERON_0001388","UBERON_0000948","UBERON_0002107","UBERON_0002048","UBERON_0002106","UBERON_0002370","UBERON_0000995","UBERON_0000473","UBERON_0001155"]},{"filename":"solanum_lycopersicum.flower_parts.svg","species":"solanum_lycopersicum","view":"flower_parts","ids":["PO_0009084","PO_0009030","PO_0009072","PO_0009073","PO_0009074","PO_0009066","PO_0009010"]},{"filename":"solanum_lycopersicum.whole_plant.svg","species":"solanum_lycopersicum","view":"whole_plant","ids":["PO_0025034","PO_0000056","PO_0009046","PO_0009001","PO_0009005"]},{"filename":"solanum_tuberosum.svg","species":"solanum_tuberosum","view":"","ids":[]},{"filename":"sorghum_bicolor.flower_parts.svg","species":"sorghum_bicolor","view":"flower_parts","ids":["PO_0009049","PO_0009051","PO_0009001","PO_0009009","PO_0009089","PO_0009066","PO_0009030"]},{"filename":"sorghum_bicolor.whole_plant.svg","species":"sorghum_bicolor","view":"whole_plant","ids":["PO_0009006","PO_0006079","PO_0009047","PO_0000230","PO_0009049","PO_0025034","PO_0009005"]},{"filename":"tetraodon_nigroviridis.svg","species":"tetraodon_nigroviridis","view":"","ids":["UBERON_0000955","UBERON_0000948","UBERON_0002113","UBERON_0014892"]},{"filename":"triticum_aestivum.flower_parts.svg","species":"triticum_aestivum","view":"flower_parts","ids":["PO_0020033","PO_0020031","PO_0009089","PO_0009085","PO_0009086","PO_0009084","PO_0009009","PO_0009001","PO_0009088","PO_0009030","PO_0009066"]},{"filename":"triticum_aestivum.whole_plant.svg","species":"triticum_aestivum","view":"whole_plant","ids":["PO_0009047","PO_0009005","PO_0009049","PO_0025034"]},{"filename":"xenopus_tropicalis.svg","species":"xenopus_tropicalis","view":"","ids":["UBERON_0000955","UBERON_0002113","UBERON_0014892","UBERON_0000948","UBERON_0002107"]},{"filename":"zea_mays.flower_parts.svg","species":"zea_mays","view":"flower_parts","ids":["PO_0009001","PO_0020033","PO_0020031","PO_0020136","PO_0025597","PO_0009066","PO_0009009","PO_0009089","PO_0009084"]},{"filename":"zea_mays.whole_plant.svg","species":"zea_mays","view":"whole_plant","ids":["PO_0020126","PO_0020136","PO_0020142","PO_0020127","PO_0009005","PO_0009074","PO_0025034"]}];

/***/ }),

/***/ "./src/svg sync recursive ^\\.\\/.*\\.svg$":
/*!************************************!*\
  !*** ./src/svg sync ^\.\/.*\.svg$ ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./anolis_carolinensis.svg": "./src/svg/anolis_carolinensis.svg",
	"./arabidopsis_thaliana.svg": "./src/svg/arabidopsis_thaliana.svg",
	"./bos_taurus.svg": "./src/svg/bos_taurus.svg",
	"./brachypodium_distachyon.flower_parts.svg": "./src/svg/brachypodium_distachyon.flower_parts.svg",
	"./brachypodium_distachyon.whole_plant.svg": "./src/svg/brachypodium_distachyon.whole_plant.svg",
	"./gallus_gallus.svg": "./src/svg/gallus_gallus.svg",
	"./homo_sapiens.brain.svg": "./src/svg/homo_sapiens.brain.svg",
	"./homo_sapiens.female.svg": "./src/svg/homo_sapiens.female.svg",
	"./homo_sapiens.male.svg": "./src/svg/homo_sapiens.male.svg",
	"./hordeum_vulgare.flower_parts.svg": "./src/svg/hordeum_vulgare.flower_parts.svg",
	"./hordeum_vulgare.whole_plant.svg": "./src/svg/hordeum_vulgare.whole_plant.svg",
	"./macaca_mulatta.svg": "./src/svg/macaca_mulatta.svg",
	"./monodelphis_domestica.svg": "./src/svg/monodelphis_domestica.svg",
	"./mus_musculus.brain.svg": "./src/svg/mus_musculus.brain.svg",
	"./mus_musculus.female.svg": "./src/svg/mus_musculus.female.svg",
	"./mus_musculus.male.svg": "./src/svg/mus_musculus.male.svg",
	"./oryza_sativa.flower_parts.svg": "./src/svg/oryza_sativa.flower_parts.svg",
	"./oryza_sativa.whole_plant.svg": "./src/svg/oryza_sativa.whole_plant.svg",
	"./papio_anubis.svg": "./src/svg/papio_anubis.svg",
	"./rattus_norvegicus.svg": "./src/svg/rattus_norvegicus.svg",
	"./solanum_lycopersicum.flower_parts.svg": "./src/svg/solanum_lycopersicum.flower_parts.svg",
	"./solanum_lycopersicum.whole_plant.svg": "./src/svg/solanum_lycopersicum.whole_plant.svg",
	"./solanum_tuberosum.svg": "./src/svg/solanum_tuberosum.svg",
	"./sorghum_bicolor.flower_parts.svg": "./src/svg/sorghum_bicolor.flower_parts.svg",
	"./sorghum_bicolor.whole_plant.svg": "./src/svg/sorghum_bicolor.whole_plant.svg",
	"./tetraodon_nigroviridis.svg": "./src/svg/tetraodon_nigroviridis.svg",
	"./triticum_aestivum.flower_parts.svg": "./src/svg/triticum_aestivum.flower_parts.svg",
	"./triticum_aestivum.whole_plant.svg": "./src/svg/triticum_aestivum.whole_plant.svg",
	"./xenopus_tropicalis.svg": "./src/svg/xenopus_tropicalis.svg",
	"./zea_mays.flower_parts.svg": "./src/svg/zea_mays.flower_parts.svg",
	"./zea_mays.whole_plant.svg": "./src/svg/zea_mays.whole_plant.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/svg sync recursive ^\\.\\/.*\\.svg$";

/***/ }),

/***/ "./src/svg/anolis_carolinensis.svg":
/*!*****************************************!*\
  !*** ./src/svg/anolis_carolinensis.svg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "42e11a1afb321056726cb714fc2b29ed.svg";

/***/ }),

/***/ "./src/svg/arabidopsis_thaliana.svg":
/*!******************************************!*\
  !*** ./src/svg/arabidopsis_thaliana.svg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9e029162d2d2fca8137ab8fd3cf12ffc.svg";

/***/ }),

/***/ "./src/svg/bos_taurus.svg":
/*!********************************!*\
  !*** ./src/svg/bos_taurus.svg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1f0105bc3a6666729c11d80ffa1ae919.svg";

/***/ }),

/***/ "./src/svg/brachypodium_distachyon.flower_parts.svg":
/*!**********************************************************!*\
  !*** ./src/svg/brachypodium_distachyon.flower_parts.svg ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1de18558e556536a227801779aa94771.svg";

/***/ }),

/***/ "./src/svg/brachypodium_distachyon.whole_plant.svg":
/*!*********************************************************!*\
  !*** ./src/svg/brachypodium_distachyon.whole_plant.svg ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9ca356010afccc1946b8290847dc90bf.svg";

/***/ }),

/***/ "./src/svg/gallus_gallus.svg":
/*!***********************************!*\
  !*** ./src/svg/gallus_gallus.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "13d5276968b2bdba1c6d83dbc4892cc6.svg";

/***/ }),

/***/ "./src/svg/homo_sapiens.brain.svg":
/*!****************************************!*\
  !*** ./src/svg/homo_sapiens.brain.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f7155367498db4e86049d705e91b8956.svg";

/***/ }),

/***/ "./src/svg/homo_sapiens.female.svg":
/*!*****************************************!*\
  !*** ./src/svg/homo_sapiens.female.svg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "52fda97ce0f3cbfac07626e56daead32.svg";

/***/ }),

/***/ "./src/svg/homo_sapiens.male.svg":
/*!***************************************!*\
  !*** ./src/svg/homo_sapiens.male.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4626c730027e5ff70254d23451537f9a.svg";

/***/ }),

/***/ "./src/svg/hordeum_vulgare.flower_parts.svg":
/*!**************************************************!*\
  !*** ./src/svg/hordeum_vulgare.flower_parts.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "81117fe192f85492d5a0a4e2465b11d0.svg";

/***/ }),

/***/ "./src/svg/hordeum_vulgare.whole_plant.svg":
/*!*************************************************!*\
  !*** ./src/svg/hordeum_vulgare.whole_plant.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5614d388d36f6cab27fa6de4fdbac6de.svg";

/***/ }),

/***/ "./src/svg/macaca_mulatta.svg":
/*!************************************!*\
  !*** ./src/svg/macaca_mulatta.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6dc6fed18ecfbebfbf9403a6c7df6515.svg";

/***/ }),

/***/ "./src/svg/monodelphis_domestica.svg":
/*!*******************************************!*\
  !*** ./src/svg/monodelphis_domestica.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7b27468902ba520db2e27431e247547c.svg";

/***/ }),

/***/ "./src/svg/mus_musculus.brain.svg":
/*!****************************************!*\
  !*** ./src/svg/mus_musculus.brain.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bbbcce33c7259be34c77037843606255.svg";

/***/ }),

/***/ "./src/svg/mus_musculus.female.svg":
/*!*****************************************!*\
  !*** ./src/svg/mus_musculus.female.svg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f950766239d4c1005b43ec60a19f212a.svg";

/***/ }),

/***/ "./src/svg/mus_musculus.male.svg":
/*!***************************************!*\
  !*** ./src/svg/mus_musculus.male.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "236878cf36edd206f852c1c86a98ec2c.svg";

/***/ }),

/***/ "./src/svg/oryza_sativa.flower_parts.svg":
/*!***********************************************!*\
  !*** ./src/svg/oryza_sativa.flower_parts.svg ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "eef5a18199939d306c11b75323c7fe5c.svg";

/***/ }),

/***/ "./src/svg/oryza_sativa.whole_plant.svg":
/*!**********************************************!*\
  !*** ./src/svg/oryza_sativa.whole_plant.svg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "feb47a20dd2a281a55f6521928d5759b.svg";

/***/ }),

/***/ "./src/svg/papio_anubis.svg":
/*!**********************************!*\
  !*** ./src/svg/papio_anubis.svg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "63fff6b7536e843452ae95b82b28402d.svg";

/***/ }),

/***/ "./src/svg/rattus_norvegicus.svg":
/*!***************************************!*\
  !*** ./src/svg/rattus_norvegicus.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "28ac5ad41796711bfe061af787b1bc7e.svg";

/***/ }),

/***/ "./src/svg/solanum_lycopersicum.flower_parts.svg":
/*!*******************************************************!*\
  !*** ./src/svg/solanum_lycopersicum.flower_parts.svg ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bd5b384f4015e57ab394bf1a0e60b208.svg";

/***/ }),

/***/ "./src/svg/solanum_lycopersicum.whole_plant.svg":
/*!******************************************************!*\
  !*** ./src/svg/solanum_lycopersicum.whole_plant.svg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0f358510861736791edc8f91eb88aa27.svg";

/***/ }),

/***/ "./src/svg/solanum_tuberosum.svg":
/*!***************************************!*\
  !*** ./src/svg/solanum_tuberosum.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2c3a60abb1fd4675c939f2623f939379.svg";

/***/ }),

/***/ "./src/svg/sorghum_bicolor.flower_parts.svg":
/*!**************************************************!*\
  !*** ./src/svg/sorghum_bicolor.flower_parts.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d716785b6df1eb3436ed0c8b083023df.svg";

/***/ }),

/***/ "./src/svg/sorghum_bicolor.whole_plant.svg":
/*!*************************************************!*\
  !*** ./src/svg/sorghum_bicolor.whole_plant.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "120316d86001911ca318d627334d5074.svg";

/***/ }),

/***/ "./src/svg/tetraodon_nigroviridis.svg":
/*!********************************************!*\
  !*** ./src/svg/tetraodon_nigroviridis.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9a5bda4d22d8db48509add286b5cd013.svg";

/***/ }),

/***/ "./src/svg/triticum_aestivum.flower_parts.svg":
/*!****************************************************!*\
  !*** ./src/svg/triticum_aestivum.flower_parts.svg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3dbe683fb3d8d07aba0cc901ad694d7c.svg";

/***/ }),

/***/ "./src/svg/triticum_aestivum.whole_plant.svg":
/*!***************************************************!*\
  !*** ./src/svg/triticum_aestivum.whole_plant.svg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "eb959d9bbea6f5ee892ce2c7b045fb8d.svg";

/***/ }),

/***/ "./src/svg/xenopus_tropicalis.svg":
/*!****************************************!*\
  !*** ./src/svg/xenopus_tropicalis.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "98271459a68eef1b5b641ceb2fdf9e08.svg";

/***/ }),

/***/ "./src/svg/zea_mays.flower_parts.svg":
/*!*******************************************!*\
  !*** ./src/svg/zea_mays.flower_parts.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3f037101504d51568440b73cd5bd7808.svg";

/***/ }),

/***/ "./src/svg/zea_mays.whole_plant.svg":
/*!******************************************!*\
  !*** ./src/svg/zea_mays.whole_plant.svg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9c89f587f71426483e6bfe764220aa18.svg";

/***/ })

},[["./html/AnatomogramDemo.js","vendors"]]]);
//# sourceMappingURL=demo.bundle.js.map