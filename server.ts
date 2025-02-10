import express from 'express';
import { Application, Request, Response } from 'express-serve-static-core';
import path from 'path';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, World');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

app.use(express.static(path.join(__dirname, 'public')));
