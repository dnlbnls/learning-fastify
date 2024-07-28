Reorganized "2-todo", wanted to have more organization, follow best practices, have a place for the business logic separated.

Inspiration:
https://github.com/fastify/fastify-example-todo
https://github.com/David200308/Todo-List-Fastify-RESTAPI/

Created schemas folder, which holds the schema definitions of the routes
Created services folder, serves place for route logic
TBD: Where store business logic? Should it not be in services?
app.js now registers "services" as plugins (for routes)

Added postman collection for future usage

Changes:
* Made pino-pretty a development dependency: npm install pino-pretty --save-dev

Node v20.16.0