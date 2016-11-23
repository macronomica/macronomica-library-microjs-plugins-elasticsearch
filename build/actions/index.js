'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Проксируем любые запросы к клиенту es и если есть перекрытые отдаем их
 */
exports.default = function (micro, plugin, client) {
  var decorators = { search: _search2.default };

  Object.keys(decorators).forEach(function (key) {
    return decorators[key] = decorators[key](micro, plugin, client);
  });

  return new Proxy(client, {
    get: function get(target, property) {
      if (property in decorators) {
        return decorators[property];
      }

      return target[property];
    }
  });
};
//# sourceMappingURL=index.js.map