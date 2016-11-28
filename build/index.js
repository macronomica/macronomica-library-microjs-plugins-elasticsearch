'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (settings) {
  return function (micro, name, pluginId) {
    var plugin = { name: name, id: pluginId };
    var __client = void 0;
    var __actions = {};

    micro.queue({
      case: 'wait',
      args: [],
      done: function done() {
        return (0, _connect2.default)(micro, plugin, settings).then(function (client) {
          __actions = (0, _actions2.default)(micro, plugin, __client = client);
          return client;
        });
      }
    }).queue({
      case: 'close',
      args: [],
      done: function done() {
        return new Promise(function (resolve) {
          if (!!__client) {
            __actions = null;
            __client = null;
          }

          micro.logger.info('\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A ElasticSearch \u0440\u0430\u0437\u043E\u0440\u0432\u0430\u043D\u043E', {
            id: plugin.id
          });

          resolve();
        });
      }
    });

    return {
      middleware: _elasticsearch2.default,
      client: function client() {
        return __client;
      },
      actions: function actions() {
        return __actions;
      }
    };
  };
};
//# sourceMappingURL=index.js.map