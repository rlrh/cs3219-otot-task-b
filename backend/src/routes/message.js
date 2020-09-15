import { v4 as uuidv4 } from "uuid";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.find();
  return res.send(messages);
});

router.get("/:messageId", async (req, res, next) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId
  ).catch((error) => {
    error.statusCode = 400;
    next(error);
  });
  return res.send(message);
});

router.post("/", async (req, res, next) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    user: req.context.me.id,
  }).catch((error) => {
    error.statusCode = 400;
    next(error);
  });

  return res.send(message);
});

router.put("/:messageId", async (req, res, next) => {
  try {
    const message = await req.context.models.Message.findById(
      req.params.messageId
    );
    if (message.user != req.context.me.id) {
      throw new Error("User is not creator of message");
    } else {
      message.text = req.body.text;
      await message.save();
      return res.send(message);
    }
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
});

router.delete("/:messageId", async (req, res, next) => {
  try {
    const message = await req.context.models.Message.findById(
      req.params.messageId
    );
    if (message.user != req.context.me.id) {
      throw new Error("User is not creator of message");
    }
    if (message) {
      await message.remove();
    }
    return res.send(message);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
});

export default router;
