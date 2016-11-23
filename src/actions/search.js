import { DEFAULT_SEARCH_LIMIT } from './../constants';

export default (micro, plugin, client) => ({ body:{ from = 0, size = DEFAULT_SEARCH_LIMIT, ...body } = {}, ...other }) =>
  client.search({
    ignore: [ 404 ],
    body: { from, size, ...body },
    ...other
  })