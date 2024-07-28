'use strict';
import fastify from 'fastify';
import { createError } from '@fastify/error';
import spa from './routes/spa.js';
import movies from './routes/movies.js';

const KaboomError = createError('KaboomError', 'Something went wrong', 501);

export async function build (opts){  
  const app = fastify(opts);

  app.register(spa);
  app.register(movies);

  app.get('/', async (request, reply) => {
    return {hello: 'world'};
  });

  app.get('/error', async (request, reply) => {
    throw new KaboomError();
  });
 
  app.get('/send-to-not-found', async (request, reply) => {
    request.log.info('Sending to not found');
    reply.callNotFound();
  });

 
  app.setErrorHandler(async function (err, request, reply){
    request.log.error({err});
    reply.code(err.statusCode || 500);
    return {error: err.message};
  });

  app.setNotFoundHandler(async (request, reply) =>{
    reply.code(404);
    return {error: 'Not found'};
  });

  return app;

}