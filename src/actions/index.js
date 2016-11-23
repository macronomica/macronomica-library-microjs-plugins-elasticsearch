import search from './search';

/**
 *  Проксируем любые запросы к клиенту es и если есть перекрытые отдаем их
 */
export default (micro, plugin, client) => {
  const decorators = { search };

  Object
    .keys(decorators)
    .forEach(key => decorators[ key ] = decorators[ key ](micro, plugin, client));

  return new Proxy(client, {
    get(target, property) {
      if (property in decorators) {
        return decorators[ property ];
      }

      return target[ property ];
  }});
}