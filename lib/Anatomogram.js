'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSvg = require('react-svg');

var _reactSvg2 = _interopRequireDefault(_reactSvg);

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

var _svgsMetadata = require('./json/svgsMetadata.json');

var _svgsMetadata2 = _interopRequireDefault(_svgsMetadata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayDifference = function arrayDifference(arr1, arr2) {
  return arr1.filter(function (e) {
    return !arr2.includes(e);
  });
};

var getSvgElementById = function getSvgElementById(svgDomNode) {
  var getEfoLayerGroup = function getEfoLayerGroup(svgDomNode) {
    var svgGroups = svgDomNode.getElementsByTagName('g');
    for (var i = 0; i < svgGroups.length; i++) {
      if (svgGroups[i].id === 'LAYER_EFO') {
        return svgGroups[i];
      }
    }
  };

  var efoLayerGroup = getEfoLayerGroup(svgDomNode);

  function _getSvgElementById(id) {
    if (efoLayerGroup) {
      for (var i = 0; i < efoLayerGroup.children.length; i++) {
        if (efoLayerGroup.children[i].id === id) {
          if (efoLayerGroup.children[i].attributes['xlink:href']) {
            return _getSvgElementById(efoLayerGroup.children[i].attributes['xlink:href'].value.substring(1));
          } else {
            return efoLayerGroup.children[i];
          }
        }
      }
    }
  }

  return _getSvgElementById;
};

var paintIds = function paintIds(ids, colour, opacity, getSvgElementById) {
  ids.forEach(function (id) {
    var e = getSvgElementById(id);

    // We might be showing an ID which is not part of the displayed anatomogram (e.g. heart in brain)
    if (e) {
      e.style.fill = colour;
      e.style.opacity = opacity;
    }
  });
};

var addMouseOverMouseOutListeners = function addMouseOverMouseOutListeners(ids, mouseOverColour, mouseOverOpacity, getSvgElementById) {
  ids.forEach(function (id) {
    var e = getSvgElementById(id);

    if (e) {
      e.addEventListener('mouseover', function () {
        e.style.fill = mouseOverColour;
        e.style.opacity = mouseOverOpacity;
      });

      var originalColour = e.style.fill;
      var originalOpacity = e.style.opacity;
      e.addEventListener('mouseout', function () {
        e.style.fill = originalColour;
        e.style.opacity = originalOpacity;
      });
    }
  });
};

var attachCallbacks = function attachCallbacks(ids, eventName, callback, getSvgElementById) {
  ids.forEach(function (id) {
    var e = getSvgElementById(id);

    if (e) {
      e.addEventListener(eventName, function () {
        callback(id);
      });
    }
  });
};

var Anatomogram = function (_React$Component) {
  _inherits(Anatomogram, _React$Component);

  function Anatomogram(props) {
    _classCallCheck(this, Anatomogram);

    return _possibleConstructorReturn(this, (Anatomogram.__proto__ || Object.getPrototypeOf(Anatomogram)).call(this, props));
  }

  // ReactSVG loads the SVG file asynchronously (hence the callback prop). We don’t use componentDidUpdate or
  // componentDidMount because they can’t guarantee that the SVG is already loaded when they’re run. We can see this
  // happening when we Show All in human, and we switch to male/female for the first time, only the outline is shown.


  _createClass(Anatomogram, [{
    key: '_initialiseSvgElements',
    value: function _initialiseSvgElements(getSvgElementById) {
      var _props = this.props,
          showIds = _props.showIds,
          showColour = _props.showColour,
          showOpacity = _props.showOpacity,
          highlightIds = _props.highlightIds,
          highlightColour = _props.highlightColour,
          highlightOpacity = _props.highlightOpacity,
          selectIds = _props.selectIds,
          selectColour = _props.selectColour,
          selectOpacity = _props.selectOpacity;


      var uniqueShowIds = arrayDifference(showIds, [].concat(_toConsumableArray(highlightIds), _toConsumableArray(selectIds)));
      var uniqueHighlightIds = arrayDifference(highlightIds, selectIds);

      paintIds(uniqueShowIds, showColour, showOpacity, getSvgElementById);
      paintIds(uniqueHighlightIds, highlightColour, highlightOpacity, getSvgElementById);
      paintIds(selectIds, selectColour, selectOpacity, getSvgElementById);

      addMouseOverMouseOutListeners(uniqueShowIds, highlightColour, highlightOpacity, getSvgElementById);
      addMouseOverMouseOutListeners(uniqueHighlightIds, highlightColour, highlightOpacity + 0.2, getSvgElementById);
      addMouseOverMouseOutListeners(selectIds, selectColour, selectOpacity + 0.2, getSvgElementById);

      attachCallbacks([].concat(_toConsumableArray(uniqueShowIds), _toConsumableArray(uniqueHighlightIds), _toConsumableArray(selectIds)), 'mouseover', this.props.onMouseOver, getSvgElementById);
      attachCallbacks([].concat(_toConsumableArray(uniqueShowIds), _toConsumableArray(uniqueHighlightIds), _toConsumableArray(selectIds)), 'mouseout', this.props.onMouseOut, getSvgElementById);
      attachCallbacks([].concat(_toConsumableArray(uniqueShowIds), _toConsumableArray(uniqueHighlightIds), _toConsumableArray(selectIds)), 'click', this.props.onClick, getSvgElementById);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var aspectRatio = _svgsMetadata2.default[this.props.filename].width / _svgsMetadata2.default[this.props.filename].height;
      var _props2 = this.props,
          height = _props2.height,
          width = _props2.width;


      var sizeStyle = {};
      if (height && width) {
        sizeStyle.width = width;
        sizeStyle.height = height;
      } else if (height) {
        sizeStyle.height = height;
        sizeStyle.width = height * aspectRatio;
      } else {
        // if (width)
        sizeStyle.width = width;
        sizeStyle.height = width / aspectRatio;
      }
      return _react2.default.createElement(
        'div',
        { style: { float: 'left' } },
        _react2.default.createElement(_reactSvg2.default, {
          ref: function ref(svgRef) {
            _this2.svgRef = svgRef;
          },
          path: (0, _urijs2.default)('svg/' + this.props.filename, this.props.urlToResources).toString(),
          callback: function callback(svgDomNode) {
            _this2._initialiseSvgElements(getSvgElementById(svgDomNode));
          },
          style: sizeStyle
        })
      );
    }
  }]);

  return Anatomogram;
}(_react2.default.Component);

Anatomogram.propTypes = {
  urlToResources: _propTypes2.default.string.isRequired,
  filename: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number,

  showIds: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  highlightIds: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  selectIds: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,

  showColour: _propTypes2.default.string.isRequired,
  highlightColour: _propTypes2.default.string.isRequired,
  selectColour: _propTypes2.default.string.isRequired,

  showOpacity: _propTypes2.default.number.isRequired,
  highlightOpacity: _propTypes2.default.number.isRequired,
  selectOpacity: _propTypes2.default.number.isRequired,

  onMouseOver: _propTypes2.default.func.isRequired,
  onMouseOut: _propTypes2.default.func.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

exports.default = Anatomogram;