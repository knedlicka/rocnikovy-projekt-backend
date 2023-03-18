import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 5000;

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/check-solution', (req: Request, res: Response) => {
  const solution = req.body.solution;
  if (solution == "abc") {
    res.send("OK");
  } else {
    res.send("FAIL");
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
