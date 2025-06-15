import { Router } from "express";
import {
  verifyWebhook,
  handleIncomingMessage,
} from "../controllers/webhook.controller.js";

const router = Router();

// Route for Meta to verify the webhook
router.get("/:projectId", verifyWebhook);

// Route for Meta to send message updates
router.post("/:projectId", handleIncomingMessage);

export default router;