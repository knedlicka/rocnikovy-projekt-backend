import express, { Express, Request, Response } from 'express';
import Task from "./db/models/Task";

const app: Express = express();
const port = 5000;

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/tasks/check', async (req: Request, res: Response) => {
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
    res.send("Error checking solution");
  }
})

app.get('/tasks', (req: Request, res: Response) => {
  try {
    const tasks = Task.findAll();
    res.send({ tasks });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send("Server error getting tasks");
  }
});

app.post('/tasks', async (req: Request, res: Response) => {
  if (!req.body?.name || !req.body?.statement || !req.body?.deadline || !req.body?.correctSolution) {
    res.status(400);
    res.send("Invalid body");
    return;
  }
  try {
    await Task.create({
      name: req.body.name as string,
      statement: req.body.statement as string,
      deadline: new Date(req.body.deadline as string),
      correctSolution: req.body.correctSolution as string
    });
    res.send("OK");
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send("Server error creating a task");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
