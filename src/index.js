import middleware from 'elasticsearch';
import connect from './connect';
import actions from './actions';

export default ({ es } = {}) => (micro, name, pluginId) => {
  const plugin = { name, id: pluginId };
  let __client;
  let __actions = {};

  micro
    .queue({
      case: 'wait',
      args: [],
      done: () => new Promise(resolve => {
        __client = connect({ es });
        __actions = actions(micro, plugin, __client);
        resolve();
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

        resolve();
      })
    });

  return {
    middleware,
    client() { return __client },
    actions() { return __actions },
  }
}