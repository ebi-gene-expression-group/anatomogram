'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

var _Switcher = require('./Switcher.js');

var _Switcher2 = _interopRequireDefault(_Switcher);

var _Anatomogram = require('./Anatomogram.js');

var _Anatomogram2 = _interopRequireDefault(_Anatomogram);

var _svgs = require('./json/svgs.json');

var _svgs2 = _interopRequireDefault(_svgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnatomogramContainer = function (_React$Component) {
  _inherits(AnatomogramContainer, _React$Component);

  function AnatomogramContainer(props) {
    _classCallCheck(this, AnatomogramContainer);

    var _this = _possibleConstructorReturn(this, (AnatomogramContainer.__proto__ || Object.getPrototypeOf(AnatomogramContainer)).call(this, props));

    _this.state = {
      selectedAnatomogramType: _svgs2.default[_this.props.species][0] || ''
    };

    _this._switchAnatomogramType = _this._switchAnatomogramType.bind(_this);
    return _this;
  }

  _createClass(AnatomogramContainer, [{
    key: '_switchAnatomogramType',
    value: function _switchAnatomogramType(anatomogramType) {
      this.setState({
        selectedAnatomogramType: anatomogramType
      });
    }

    // Not strictly necessary but it makes it work with the demo and switch species

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.species !== nextProps.species) {
        this.setState({
          selectedAnatomogramType: _svgs2.default[nextProps.species][0] || ''
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var svgFilename = this.props.species + this.state.selectedAnatomogramType + '.svg';
      var urlToResources = (0, _urijs2.default)(this.props.pathToResources, this.props.atlasUrl).toString();

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Switcher2.default, { urlToResources: urlToResources,
          anatomogramTypes: _svgs2.default[this.props.species],
          selectedType: this.state.selectedAnatomogramType,
          onClick: this._switchAnatomogramType }),
        _react2.default.createElement(_Anatomogram2.default, _extends({ urlToResources: urlToResources,
          filename: svgFilename
        }, this.props))
      );
    }
  }]);

  return AnatomogramContainer;
}(_react2.default.Component);

AnatomogramContainer.propTypes = {
  atlasUrl: _propTypes2.default.string,
  pathToResources: _propTypes2.default.string,
  species: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number,

  showIds: _propTypes2.default.arrayOf(_propTypes2.default.string),
  highlightIds: _propTypes2.default.arrayOf(_propTypes2.default.string),
  selectIds: _propTypes2.default.arrayOf(_propTypes2.default.string),

  showColour: _propTypes2.default.string,
  highlightColour: _propTypes2.default.string,
  selectColour: _propTypes2.default.string,

  onMouseOver: _propTypes2.default.func,
  onMouseOut: _propTypes2.default.func,
  onClick: _propTypes2.default.func
};

AnatomogramContainer.defaultProps = {
  atlasUrl: '',
  pathToResources: '',
  width: 500,
  showColour: 'grey',
  highlightColour: 'red',
  selectColour: 'purple',
  showOpacity: 0.4,
  highlightOpacity: 0.4,
  selectOpacity: 0.4,
  onMouseOver: function onMouseOver() {},
  onMouseOut: function onMouseOut() {},
  onClick: function onClick() {}
};

exports.default = AnatomogramContainer;