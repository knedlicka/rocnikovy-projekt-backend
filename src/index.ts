import express, { Express, Request, Response } from 'express';
import Task from "./db/models/Task";

const app: Express = express();
const port = 5000;

app.use(express.json())

const addCorsHeaders = (res: Response) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.options(`/tasks/add`, (req: Request, res: Response) => {
  addCorsHeaders(res);
  res.send({});
});

app.post('/tasks/add', async (req: Request, res: Response) => {
  try {
    addCorsHeaders(res);
    if (!req.body?.name || !req.body?.statement || !req.body?.deadline || !req.body?.correctSolution || !req.body?.adminPassword) {
      res.status(400);
      res.send({ message: "Invalid body" });
      return;
    }
    if (!process.env.ADMIN_PASSWORD || req.body.adminPassword != process.env.ADMIN_PASSWORD) {
      res.status(403);
      res.send({ message: "Forbidden" });
      return;
    }
    await Task.create({
      name: req.body.name as string,
      statement: req.body.statement as string,
      deadline: new Date(req.body.deadline as string),
      correctSolution: req.body.correctSolution as string
    });
    res.send({ message: "OK" });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send({ message: "Server error adding a task" });
  }
});

app.options('/tasks/check', (req: Request, res: Response) => {
  addCorsHeaders(res);
  res.send({});
});

app.post('/tasks/check', async (req: Request, res: Response) => {
  addCorsHeaders(res);
  try {
    const task = await Task.findOne({
      where: {
        name: req.body?.name
      },
      attributes: ['correctSolution'],
      raw: true
    });
    let valid = false;
    if (task && req.body?.solution == task.correctSolution) {
      valid = true;
    }
    res.send({ valid });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send({ message: "Error checking solution" });
  }
})

app.get('/tasks', async (req: Request, res: Response) => {
  try {
    addCorsHeaders(res);
    const tasks = await Task.findAll({
      attributes: ['name', 'statement', 'deadline']
    });
    res.send({ tasks });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send({ message: "Server error getting tasks" });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
