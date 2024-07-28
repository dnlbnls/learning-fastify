'use strict';
import fastify from 'fastify';

import rootService from './services/root.js';
import todosService from './services/todos.js';


export async function build (opts){   
  const app = fastify(opts);

  app.register(rootService);
  app.register(todosService, { prefix: '/v1/todos' });

  app.setErrorHandler(async function (err, request, reply){
    request.log.error({err});
    reply.code(err.statusCode || 505);
    return {error: err.message};
  });

  return app;

}