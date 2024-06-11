import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import eventRouter from './events/event-router';
import authRouter from './auth/auth-router';

const app = express();
app.use(express.json()); 
const PORT = process.env.PORT || 3000;
app.use('/api', authRouter);

connectDB();

app.use(logger);
app.use(express.json());
app.use('/api/v1/', globalRouter);
app.use('/api', eventRouter);

app.get('/', (request, response) => {
    response.send("Working!");
}
)

app.listen(PORT, () => {
    console.log(`Server runs at http://localhost:${PORT}`);
});
