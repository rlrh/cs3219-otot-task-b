import request from "supertest";
import app from "../src/app";
import models, { connectDb, disconnectDb } from "../src/models";

const user1 = new models.User({
  username: "rayner.lim",
});

const user2 = new models.User({
  username: "mil.renyar",
});

const message1 = new models.Message({
  text: "Learnt Express.js",
  user: user1.id,
});

const message2 = new models.Message({
  text: "Experimented with Mongoose",
  user: user1.id,
});

const message3 = new models.Message({
  text: "React or Vue for the frontend?",
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
  await connectDb(process.env.TEST_DATABASE_URL);
  await Promise.all([
    models.User.deleteMany({}),
    models.Message.deleteMany({}),
  ]);
  await createUsersWithMessages();
});

afterAll(async () => {
  await Promise.all([
    models.User.deleteMany({}),
    models.Message.deleteMany({}),
  ]);
  disconnectDb();
});

describe("Message Endpoints", () => {
  describe("GET operations", () => {
    it("should return all messages", async () => {
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
            user: user1.id,
          }),
          expect.objectContaining({
            _id: message3.id,
            text: message3.text,
            user: user2.id,
          }),
        ])
      );
    });
    it("should return message 1", async () => {
      const res = await request(app).get(`/messages/${message1.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          _id: message1.id,
          text: message1.text,
          user: user1.id,
        })
      );
    });
    it("should throw error on non-existent message", async () => {
      const res = await request(app).get(`/messages/0`);
      expect(res.statusCode).toEqual(400);
    });
  });
  describe("POST operations", () => {
    it("should create new message", async () => {
      const message = "Jest is cool";
      const res = await request(app).post("/messages").send({
        text: message,
      });
      expect(res.statusCode).toEqual(200);
      const data = res.body;
      expect(data).toHaveProperty("text");
      expect(data).toHaveProperty("user");
      expect(data).toEqual(
        expect.objectContaining({
          text: message,
          user: user1.id,
        })
      );
    });
  });
  describe("PUT operations", () => {
    it("should update existing message created by user", async () => {
      const message = "Modified message";
      const res = await request(app).put(`/messages/${message1.id}`).send({
        text: message,
      });
      expect(res.statusCode).toEqual(200);
      const data = res.body;
      expect(data).toHaveProperty("text");
      expect(data).toHaveProperty("user");
      expect(data).toEqual(
        expect.objectContaining({
          text: message,
          user: user1.id,
        })
      );
    });
    it("should throw error on updating existing message not created by user", async () => {
      const message = "Modified message";
      const res = await request(app).put(`/messages/${message3.id}`).send({
        text: message,
      });
      expect(res.statusCode).toEqual(400);
    });
    it("should throw error on updating non-existent message", async () => {
      const message = "Modified message";
      const res = await request(app).put(`/messages/0`).send({
        text: message,
      });
      expect(res.statusCode).toEqual(400);
    });
  });
  describe("DELETE operations", () => {
    it("should delete existing message created by user", async () => {
      const res = await request(app).delete(`/messages/${message2.id}`);
      expect(res.statusCode).toEqual(200);
      const data = res.body;
      expect(data).toHaveProperty("text");
      expect(data).toHaveProperty("user");
      expect(data).toEqual(
        expect.objectContaining({
          text: message2.text,
          user: user1.id,
        })
      );
    });
    it("should throw error on deleting existing message not created by user", async () => {
      const res = await request(app).put(`/messages/${message3.id}`);
      expect(res.statusCode).toEqual(400);
    });
    it("should throw error on deleting non-existent message", async () => {
      const res = await request(app).delete(`/messages/0`);
      expect(res.statusCode).toEqual(400);
    });
  });
});

describe("User Endpoints", () => {
  describe("GET operations", () => {
    it("should return all users", async () => {
      const res = await request(app).get(`/users`);
      expect(res.statusCode).toEqual(200);
      const data = res.body;
      expect(data.length).toEqual(2);
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: user1.id,
            username: user1.username,
          }),
          expect.objectContaining({
            _id: user2.id,
            username: user2.username,
          }),
        ])
      );
    });
    it("should return user 2", async () => {
      const res = await request(app).get(`/users/${user2.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          _id: user2.id,
          username: user2.username,
        })
      );
    });
  });
});
