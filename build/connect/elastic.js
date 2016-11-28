'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _lodash = require('lodash.isstring');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isplainobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _agent = require('./agent');

var _agent2 = _interopRequireDefault(_agent);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * @param {object} micro
 * @param {object} plugin
 * @param {string|object} [es]=CONFIG_SECTION_ES
 * @returns {*}
 */
exports.default = function (micro, plugin) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$es = _ref.es,
      es = _ref$es === undefined ? _constants.CONFIG_SECTION_ES : _ref$es;

  if (!(0, _lodash2.default)(es) && !(0, _lodash4.default)(es)) {
    throw new TypeError(['Настройки для соединения с ElasticSearch могут быть только:', '- {string} -> название имени ключа из конфигурации', '- {object} -> объектом с настройками @see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-options'].join('\n'));
  }

  var _ref2 = (0, _lodash4.default)(es) ? es : _config2.default.has(es) ? _config2.default.get(es) : {},
      _ref2$host = _ref2.host,
      host = _ref2$host === undefined ? _constants.ES_HOST : _ref2$host,
      _ref2$log = _ref2.log,
      log = _ref2$log === undefined ? _constants.ES_LOG : _ref2$log,
      _ref2$maxSockets = _ref2.maxSockets,
      maxSockets = _ref2$maxSockets === undefined ? _constants.ES_MAX_SOCKETS : _ref2$maxSockets,
      _ref2$requestTimeout = _ref2.requestTimeout,
      requestTimeout = _ref2$requestTimeout === undefined ? _constants.ES_REQUEST_TIMEOUT : _ref2$requestTimeout,
      _ref2$agent = _ref2.agent,
      agent = _ref2$agent === undefined ? _constants.CONFIG_SECTION_AGENT : _ref2$agent,
      other = _objectWithoutProperties(_ref2, ['host', 'log', 'maxSockets', 'requestTimeout', 'agent']);

  var client = new _elasticsearch2.default.Client(_extends({
    host: host, log: log, requestTimeout: requestTimeout, maxSockets: maxSockets,
    createNodeAgent: function createNodeAgent() {
      return (0, _agent2.default)(agent);
    }
  }, other));

  return client.ping().then(function () {
    micro.logger.info('\u0421\u043E\u0437\u0434\u0430\u043D\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A ElasticSearch:', {
      id: plugin.id,
      payload: _extends({
        host: host,
        log: log,
        maxSockets: maxSockets,
        requestTimeout: requestTimeout,
        agent: agent
      }, other)
    });

    return client;
  }).catch(function (error) {
    micro.logger.error('\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A ElasticSearch:', {
      id: plugin.id,
      payload: _extends({
        host: host,
        log: log,
        maxSockets: maxSockets,
        requestTimeout: requestTimeout,
        agent: agent
      }, other)
    });

    return Promise.reject(error);
  });
};
//# sourceMappingURL=elastic.js.map