import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import models, { connectDb } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('rayner.lim'),
    };
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;

    if (error.statusCode === 301) {
        return res.status(301).redirect('/not-found');
    }

    return res
        .status(error.statusCode)
        .json({ error: error.toString() });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
    app.get(/.*/, (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    })
}

if (process.env.NODE_ENV !== 'test') {

    const eraseDatabaseOnSync = true;

    connectDb(process.env.PROD_DATABASE_URL).then(async () => {
        if (eraseDatabaseOnSync) {
            await Promise.all([
                models.User.deleteMany({}),
                models.Message.deleteMany({}),
            ]);
            createUsersWithMessages();
        }
    });

    const createUsersWithMessages = async () => {
        const user1 = new models.User({
            username: 'rayner.lim',
        });

        const user2 = new models.User({
            username: 'mil.renyar',
        });

        const message1 = new models.Message({
            text: 'Learnt Express.js',
            user: user1.id,
        });

        const message2 = new models.Message({
            text: 'Experimented with Mongoose',
            user: user1.id,
        });

        const message3 = new models.Message({
            text: 'React or Vue for the frontend?',
            user: user2.id,
        });

        await message1.save();
        await message2.save();
        await message3.save();

        await user1.save();
        await user2.save();
    };
};

export default app;