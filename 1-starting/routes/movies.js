/** @type {import('fastify').FastifyPluginAsync<> }  **/

export default async function movies (app, opts){
  app.post('/movies',{
    schema: {
      body: {
        type: 'object',
        properties: {
          title: {type: 'string'},
          year: {type: 'number'}
        },
        required: ['title', 'year'] 
      }
    }
  },
    async (request, reply) => {
      const {title, year} = request.body;
      return {title, year };
  });
}