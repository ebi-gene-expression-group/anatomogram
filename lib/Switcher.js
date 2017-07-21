'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

require('./Switcher.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveUrlToIcon = function resolveUrlToIcon(urlToResources, selectedType, anatomogramType) {
  return (0, _urijs2.default)('img/' + (selectedType === anatomogramType ? '' : 'un') + 'selected' + anatomogramType + '.png', urlToResources).toString();
};

var Switcher = function Switcher(props) {
  return _react2.default.createElement(
    'div',
    { style: { float: 'left' } },
    props.anatomogramTypes.map(function (anatomogramType) {
      return _react2.default.createElement('img', { key: anatomogramType,
        className: 'gxa-selection-icon',
        onClick: function onClick() {
          props.onClick(anatomogramType);
        },
        src: resolveUrlToIcon(props.urlToResources, props.selectedType, anatomogramType) });
    })
  );
};

Switcher.propTypes = {
  anatomogramTypes: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  selectedType: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  urlToResources: _propTypes2.default.string.isRequired
};

exports.default = Switcher;