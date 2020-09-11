import request from 'supertest';
import app from '../src';
import models, { connectDb } from '../src/models';

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
    user: user2.id,
});

const message3 = new models.Message({
    text: 'React or Vue for the frontend?',
    user: user2.id,
});

const createUsersWithMessages = async () => {
    await message1.save();
    await message2.save();
    await message3.save();

    await user1.save();
    await user2.save();
};

beforeAll(async () => {
    await connectDb();
    await Promise.all([
        models.User.deleteMany({}),
        models.Message.deleteMany({}),
    ]);
    await createUsersWithMessages();
});

describe('Session Endpoints', () => {
  it('should return all the messages', async () => {
    const res = await request(app).get(`/messages`);
    expect(res.statusCode).toEqual(200);
    const data = res.body;
    expect(data.length).toEqual(3);
    expect(data).toEqual(          
        expect.arrayContaining([
            expect.objectContaining({
                _id: message1.id,
                text: message1.text,
                user: user1.id,
            }),
            expect.objectContaining({
                _id: message2.id,
                text: message2.text,
                user: user2.id,
            }),
            expect.objectContaining({
                _id: message3.id,
                text: message3.text,
                user: user2.id,
            })
        ])
      )
  })
})