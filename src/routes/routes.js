import {randomUUID} from 'node:crypto'
import { buildRoutePath } from './../utils/build-route-path.js';
import { Batabase } from './../database/db.js';
const database = new Batabase();
const createTasks = {
  method: "POST",
  url: buildRoutePath('/tasks'),
  handler: (req, res) => {
    for (const field of ['name', 'description']) {
      if (!req.body) {
        return res.writeHead(400).end(JSON.stringify({ error: `O Corpo da requisição deve ser um objeto`}));
      }
      if (typeof req.body[field] === "undefined" ||typeof req.body[field] === null) {
        return res.writeHead(400).end(JSON.stringify({ error: `${field} é obrigatório` }));
      }
      if (typeof req.body[field] !== "string") {
        return res.writeHead(400).end(JSON.stringify({ error: `${field} deve ser uma string`}));
      }
    }
    const {name, description} = req.body
    const tasks = {
      id: randomUUID(),
      name,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: null
      };
    database.insert('tasks', tasks);
    return res.writeHead(201).end()
  }
}
const listTasks = {
  method: 'GET',
  url: buildRoutePath('/tasks'),
  handler: (_, res) => {
    const tasks = database.select('tasks');
    return res.end(JSON.stringify({tasks}))
  }
}

export const routes = [listTasks, createTasks]