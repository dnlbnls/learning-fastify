import {test} from 'node:test';
import {equal, deepEqual} from 'node:assert/strict';
import {build} from './app.js';


test('test', async (t) => {
  const app = await build();
  t.after(async () => {
    await app.close();
  });
  const res = await app.inject({
    method: 'GET',
    url: '/'
  });
  equal(res.statusCode, 200);
  equal(res.headers['content-type'], 'application/json; charset=utf-8');
  deepEqual(res.json(), {hello: 'world'} );
});