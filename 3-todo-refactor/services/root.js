'use strict';

async function rootService (app, opts){
  app.get('/', async function (request, reply) {
    return { message: 'Hello Fastify!' }
  });
};

export default rootService;