import config from 'config';
import elasticsearch from 'elasticsearch';
import isString from 'lodash.isstring';
import isPlainObject from 'lodash.isplainobject';
import Agent from './agent';
import {
  CONFIG_SECTION_ES,
  CONFIG_SECTION_AGENT,
  ES_HOST,
  ES_LOG,
  ES_REQUEST_TIMEOUT,
  ES_MAX_SOCKETS,
} from '../constants';

/**
 * @param {object} micro
 * @param {object} plugin
 * @param {string|object} [es]=CONFIG_SECTION_ES
 * @returns {*}
 */
export default (micro, plugin, { es = CONFIG_SECTION_ES } = {}) => {
  if (!isString(es) && !isPlainObject(es)) {
    throw new TypeError([
      'Настройки для соединения с ElasticSearch могут быть только:',
      '- {string} -> название имени ключа из конфигурации',
      '- {object} -> объектом с настройками @see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-options',
    ].join('\n'))
  }

  const {
    host = ES_HOST,
    log = ES_LOG,
    maxSockets = ES_MAX_SOCKETS,
    requestTimeout = ES_REQUEST_TIMEOUT,
    agent = CONFIG_SECTION_AGENT,
    ...other
  } = isPlainObject(es) ? es : config.has(es) ? config.get(es) : {};

  const client = new elasticsearch.Client({
    host, log, requestTimeout, maxSockets,
    createNodeAgent: () => Agent(agent),
    ...other
  });

  return client
    .ping()
    .then(() => {
      micro.logger.info(`Создано подключение к ElasticSearch:`, {
        id  : plugin.id,
        payload: {
          host,
          log,
          maxSockets,
          requestTimeout,
          agent,
          ...other
        }
      });

      return client;
    })
    .catch(error => {
      micro.logger.error(`Ошибка подключения к ElasticSearch:`, {
        id  : plugin.id,
        payload: {
          host,
          log,
          maxSockets,
          requestTimeout,
          agent,
          ...other
        }
      });

      return Promise.reject(error);
    });
}