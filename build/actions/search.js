'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./../constants');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (micro, plugin, client) {
  return function (_ref) {
    var _ref$body = _ref.body;
    _ref$body = _ref$body === undefined ? {} : _ref$body;

    var _ref$body$from = _ref$body.from,
        from = _ref$body$from === undefined ? 0 : _ref$body$from,
        _ref$body$size = _ref$body.size,
        size = _ref$body$size === undefined ? _constants.DEFAULT_SEARCH_LIMIT : _ref$body$size,
        body = _objectWithoutProperties(_ref$body, ['from', 'size']),
        other = _objectWithoutProperties(_ref, ['body']);

    return client.search(_extends({
      ignore: [404],
      body: _extends({ from: from, size: size }, body)
    }, other));
  };
};
//# sourceMappingURL=search.js.map