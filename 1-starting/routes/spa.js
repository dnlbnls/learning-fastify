/** @type {import('fastify').FastifyPluginAsync<> }  **/

export default async function spa (app, opts){
  app.get('/spa', async (request, reply) => {
    return {spa: 'spa'};
  });
}