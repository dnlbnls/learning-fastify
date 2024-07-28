'use strict';
import { readFile, writeFile } from 'fs/promises';
import { getTodoSchema, createTodoSchema, patchTodoSchema, deleteTodoSchema } from '../schemas/todo.js';


export default async function todosService (app, opts){

  app.get('/', async (request, reply) => {
    const data = await readFile('./todos.json', 'utf8');
    const todos = JSON.parse(data);
    return todos.todos;
  });
  
  app.get('/:id', {schema: getTodoSchema}, async(request, reply) => {
    const id = request.params.id;
    const data = await readFile('./todos.json', 'utf8');
    const todos = JSON.parse(data);
    const taskIndex = todos.todos.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return reply.status(404).send({ error: 'Task not found' });
    }
  
    return todos.todos[taskIndex];
  
  });
  
  app.post('/create', { schema: createTodoSchema }, async (request, reply) => {
    const data = await readFile('./todos.json', 'utf8');
    const todos = JSON.parse(data);
    const lastId = todos.todos.reduce((maxId, task) => (task.id > maxId ? task.id : maxId), 0);
    const newId = lastId + 1;
    const title = request.body.title;
    const description = request.body.description || null;
    const unix = Math.round(new Date()/1000);
  
    const newTask = {
      id: newId,
      title: title,
      description: description,
      completed: false,
      created_at: unix,
      modified_at: unix
    }
  
    todos.todos.push(newTask);
  
    await writeFile('./todos.json', JSON.stringify(todos, null, 2), 'utf8');
  
    return newTask;
  
  });
  
  // Investigate how con the schema would I require at least one of the properties to be present, if not, return error
  app.patch('/:id',{ schema: patchTodoSchema }, async(request,reply) =>{
    const id = request.params.id;
    const data = await readFile('./todos.json', 'utf8');
    const todos = JSON.parse(data);
  
    const taskIndex = todos.todos.findIndex(task => task.id === id);
  
    if (taskIndex === -1) {
      return reply.status(404).send({ error: 'Task not found' });
    }
  
    const task = todos.todos[taskIndex];
  
    // Update task fields
    if (request.body.title !== undefined) {
      task.title = request.body.title;
    }
    if (request.body.description !== undefined) {
      task.description = request.body.description;
    }
    if (request.body.completed !== undefined) {
      task.completed = request.body.completed;
    }
  
    // Update modified_at timestamp
    task.modified_at = Math.round(new Date() / 1000);
  
    // Write the updated tasks back to the file
    await writeFile('./todos.json', JSON.stringify(todos, null, 2), 'utf8');
  
    return task;
    
  });
  
  app.delete('/:id', { schema: deleteTodoSchema }, async(request, reply) =>{
      const id = request.params.id;
      const data = await readFile('./todos.json', 'utf8');
      const todos = JSON.parse(data);
      const taskIndex = todos.todos.findIndex(task => task.id === id);
      if (taskIndex === -1) {
        return reply.status(404).send({ error: 'Task not found' });
      }
      // Remove the task from the array
      const deletedTask = todos.todos.splice(taskIndex, 1)[0];
  
      await writeFile('./todos.json', JSON.stringify(todos, null, 2), 'utf8');
  
      return { message: 'Task deleted', task: deletedTask };
  
  });

};