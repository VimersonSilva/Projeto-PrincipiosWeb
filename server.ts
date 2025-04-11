import express, { Application, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, World');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

app.use(express.static(path.join(__dirname, 'public')));
