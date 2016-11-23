import config from 'config';
import Agent from 'agentkeepalive';
import isString from 'lodash.isstring';
import isPlainObject from 'lodash.isplainobject';
import {
  CONFIG_SECTION_AGENT,
  AGENT_MAX_SOCKETS, AGENT_MAX_FREE_SOCKETS, AGENT_TIMEOUT, AGENT_KEEP_ALIVE_TIMEOUT
} from '../constants';

/**
 * @param {string|object} [agent=CONFIG_SECTION_AGENT]
 * @returns {*}
 */
export default ({ agent = CONFIG_SECTION_AGENT }) => {
  if (!isString(agent) || !isPlainObject(agent)) {
    throw new TypeError([
      'Настройки для Agent ElasticSearch могут быть только:',
      '- {string} -> название имени ключа из конфигурации',
      '- {object} -> объектом с настройками @see https://www.npmjs.com/package/agentkeepalive',
    ].join('\n'))
  }

  const {
    maxSockets = AGENT_MAX_SOCKETS,
    maxFreeSockets  = AGENT_MAX_FREE_SOCKETS,
    timeout = AGENT_TIMEOUT,
    keepAliveTimeout = AGENT_KEEP_ALIVE_TIMEOUT
  } = isPlainObject(agent) ? agent : config.has(agent) ? config.get(agent) : {};

  return new Agent({ maxSockets, maxFreeSockets, timeout, keepAliveTimeout });
}