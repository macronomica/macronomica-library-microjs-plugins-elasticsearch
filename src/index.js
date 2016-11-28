import middleware from 'elasticsearch';
import connect from './connect';
import actions from './actions';

export default (settings) => (micro, name, pluginId) => {
  const plugin = { name, id: pluginId };
  let __client;
  let __actions = {};

  micro
    .queue({
      case: 'wait',
      args: [],
      done: () => connect(micro, plugin, settings)
        .then(client => {
          __actions = actions(micro, plugin, __client = client);
          return client;
        })
    })
    .queue({
      case: 'close',
      args: [],
      done: () => new Promise(resolve => {
        if (!!__client) {
          __actions = null;
          __client = null;
        }

        micro.logger.info(`Подключение к ElasticSearch разорвано`, {
          id: plugin.id
        });

        resolve();
      })
    });

  return {
    middleware,
    client() { return __client },
    actions() { return __actions },
  }
}