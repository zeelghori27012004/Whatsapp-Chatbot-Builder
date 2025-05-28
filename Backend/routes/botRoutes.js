import express from 'express';
import auth from '../middleware/auth.js';
import { getBots, createBot, deleteBot } from '../controllers/botController.js';

const router = express.Router();
router.use(auth);
router.get('/', getBots);
router.post('/', createBot);
router.delete('/:id', deleteBot);

export default router;