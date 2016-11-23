export const CONFIG_SECTION_ES = 'es';
export const CONFIG_SECTION_AGENT = `${ CONFIG_SECTION_ES }.agent`;

export const ES_HOST = 'http://localhost:9200';
export const ES_LOG = 'warning';
export const ES_REQUEST_TIMEOUT = 60000;
export const ES_MAX_SOCKETS = 1000;

export const AGENT_MAX_SOCKETS = ES_MAX_SOCKETS;
export const AGENT_MAX_FREE_SOCKETS = 10;
export const AGENT_TIMEOUT = ES_REQUEST_TIMEOUT;
export const AGENT_KEEP_ALIVE_TIMEOUT = ES_REQUEST_TIMEOUT / 2;

export const DEFAULT_SEARCH_LIMIT = 12;