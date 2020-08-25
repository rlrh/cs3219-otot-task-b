import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import models from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.listen(3000, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);