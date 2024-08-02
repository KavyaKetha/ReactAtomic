import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { errorMiddleware, verifyToken, logout } from './src/middlewares';

import { dbConnection } from './config/database.config';
import candidateRouter from './src/routes/candidate.routes';
import userRouter from './src/routes/user.routes';
import bookRouter from './src/routes/book.routes';


const PORT = process.env.PORT ?? 3000;
const app = express();
dbConnection();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use('/book', verifyToken, bookRouter);
app.use('/candidates', verifyToken, candidateRouter);
app.use('/', userRouter);
app.use('/logout', logout);

app.use(errorMiddleware);



app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.get('*', function (req: Request, res: Response) {
    res.status(404).json({ message: 'API Not found' });
});

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});


export default app;
