import Bot from "../models/Bot.js";

// GET /api/bots
export const getBots = async (req, res) => {
  try {
    const bots = await Bot.find({ owner: req.user._id }).sort({ name: 1 });
    res.json(bots);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch bots", error: err.message });
  }
};

// POST /api/bots
export const createBot = async (req, res) => {
  try {
    const bot = await Bot.create({ owner: req.user._id, ...req.body });
    res.status(201).json(bot);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create bot", error: err.message });
  }
};

// DELETE /api/bots/:id
export const deleteBot = async (req, res) => {
  try {
    const deleted = await Bot.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Bot not found" });
    }

    res.json({ message: "Bot deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete bot", error: err.message });
  }
};

// PUT /api/bots/:id
export const updateBot = async (req, res) => {
  try {
    const updatedBot = await Bot.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedBot) {
      return res
        .status(404)
        .json({ message: "Bot not found or not owned by user" });
    }

    res.json(updatedBot);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update bot", error: err.message });
  }
};
