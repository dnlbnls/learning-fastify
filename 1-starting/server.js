'use strict';
import { build } from "./app.js";
import closeWithGrace from "close-with-grace";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const opts = {logger: true}

if (process.stdout.isTTY){
  opts.logger = { transport: { target: 'pino-pretty'} };
}

const app = await build(opts);

app.listen({port: port, host: host });


closeWithGrace(async ({signal, err}) => {
  if(err){
    app.log.error({err}, 'server closing with error');
  }else{
    app.log.info({signal}, 'signal received. server closing');
  }
  await app.close();
});


// fastify.listen({ port: 3000 }, function (err, address) {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// });


// try {
//   await fastify.listen({port:3000});
// } catch (error) {
//   fastify.log.error(err);
//   process.exit(1);
// }