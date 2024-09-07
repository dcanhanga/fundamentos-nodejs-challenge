import {randomUUID} from 'node:crypto'
import { buildRoutePath } from './../utils/build-route-path.js';
import { Batabase } from './../database/db.js';
import {validateCreateTaskPayload} from './../validators/validators.js'
const database = new Batabase();
const createTasks = {
  method: "POST",
  url: buildRoutePath('/tasks'),
  handler: (req, res) => {
     const validationError = validateCreateTaskPayload(req.body);
    if (validationError) {
      return res.writeHead(400).end(JSON.stringify({ error: validationError }));
    }
    const {title, description } = req.body;
    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: null
    };
    database.insert('tasks', task);
    return res.writeHead(201).end();
  }
};


const listTasks = {
  method: 'GET',
  url: buildRoutePath('/tasks'),
  handler: (req, res) => {
    const queries = ['title', 'description'];
    const filter = queries.reduce((acc, query) => {
      if (req.query[query]) {
        return { ...acc, [query]: req.query[query] };
      }
      return acc;
    }, {});
    const tasks = database.select('tasks',filter);
    return res.end(JSON.stringify({tasks}))
  }
}

const listTaskById = {
  method: 'GET',
  url: buildRoutePath('/tasks/:id'),
  handler: (req, res) => {
    const tasks = database.select('tasks',{id: req.params.id});
    return res.end(JSON.stringify({tasks}))
  }
}
const deleteTask = {
  method: 'DELETE',
  url: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
   database.delete('tasks', req.params.id)
    return res.writeHead(204).end()
  }
}




export const routes = [listTasks, createTasks,listTaskById,deleteTask]