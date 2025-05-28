import Bot from "../models/Bot.js";

export const getBots = async (req, res) => {
  const bots = await Bot.find({ owner: req.user._id });
  res.json(bots);
};

export const createBot = async (req, res) => {
  const bot = await Bot.create({ owner: req.user._id, ...req.body });
  res.json(bot);
};

export const deleteBot = async (req, res) => {
  await Bot.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  res.json({ message: "Bot deleted" });
};
