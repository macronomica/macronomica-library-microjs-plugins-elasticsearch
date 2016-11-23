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
        return new Promise(function (resolve) {
          __client = (0, _connect2.default)(settings);
          __actions = (0, _actions2.default)(micro, plugin, __client);
          resolve();
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