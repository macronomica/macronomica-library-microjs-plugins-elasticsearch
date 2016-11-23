'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONFIG_SECTION_ES = exports.CONFIG_SECTION_ES = 'es';
var CONFIG_SECTION_AGENT = exports.CONFIG_SECTION_AGENT = CONFIG_SECTION_ES + '.agent';

var ES_HOST = exports.ES_HOST = 'http://localhost:9200';
var ES_LOG = exports.ES_LOG = 'warning';
var ES_REQUEST_TIMEOUT = exports.ES_REQUEST_TIMEOUT = 60000;
var ES_MAX_SOCKETS = exports.ES_MAX_SOCKETS = 1000;

var AGENT_MAX_SOCKETS = exports.AGENT_MAX_SOCKETS = ES_MAX_SOCKETS;
var AGENT_MAX_FREE_SOCKETS = exports.AGENT_MAX_FREE_SOCKETS = 10;
var AGENT_TIMEOUT = exports.AGENT_TIMEOUT = ES_REQUEST_TIMEOUT;
var AGENT_KEEP_ALIVE_TIMEOUT = exports.AGENT_KEEP_ALIVE_TIMEOUT = ES_REQUEST_TIMEOUT / 2;

var DEFAULT_SEARCH_LIMIT = exports.DEFAULT_SEARCH_LIMIT = 12;
//# sourceMappingURL=constants.js.map