'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _agentkeepalive = require('agentkeepalive');

var _agentkeepalive2 = _interopRequireDefault(_agentkeepalive);

var _lodash = require('lodash.isstring');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isplainobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string|object} [agent=CONFIG_SECTION_AGENT]
 * @returns {*}
 */
exports.default = function (_ref) {
  var _ref$agent = _ref.agent,
      agent = _ref$agent === undefined ? _constants.CONFIG_SECTION_AGENT : _ref$agent;

  if (!(0, _lodash2.default)(agent) || !(0, _lodash4.default)(agent)) {
    throw new TypeError(['Настройки для Agent ElasticSearch могут быть только:', '- {string} -> название имени ключа из конфигурации', '- {object} -> объектом с настройками @see https://www.npmjs.com/package/agentkeepalive'].join('\n'));
  }

  var _ref2 = (0, _lodash4.default)(agent) ? agent : _config2.default.has(agent) ? _config2.default.get(agent) : {},
      _ref2$maxSockets = _ref2.maxSockets,
      maxSockets = _ref2$maxSockets === undefined ? _constants.AGENT_MAX_SOCKETS : _ref2$maxSockets,
      _ref2$maxFreeSockets = _ref2.maxFreeSockets,
      maxFreeSockets = _ref2$maxFreeSockets === undefined ? _constants.AGENT_MAX_FREE_SOCKETS : _ref2$maxFreeSockets,
      _ref2$timeout = _ref2.timeout,
      timeout = _ref2$timeout === undefined ? _constants.AGENT_TIMEOUT : _ref2$timeout,
      _ref2$keepAliveTimeou = _ref2.keepAliveTimeout,
      keepAliveTimeout = _ref2$keepAliveTimeou === undefined ? _constants.AGENT_KEEP_ALIVE_TIMEOUT : _ref2$keepAliveTimeou;

  return new _agentkeepalive2.default({ maxSockets: maxSockets, maxFreeSockets: maxFreeSockets, timeout: timeout, keepAliveTimeout: keepAliveTimeout });
};
//# sourceMappingURL=agent.js.map