// import express from 'express';
// import auth from '../middleware/auth.js';
// import { getBots, createBot, deleteBot } from '../controllers/botController.js';

// const router = express.Router();
// router.use(auth);
// router.get('/', getBots);
// router.post('/', createBot);
// router.delete('/:id', deleteBot);

// export default router;

import express from 'express';
import auth from '../middleware/auth.js';
import { getBots, createBot, deleteBot, updateBot } from '../controllers/botController.js';

const router = express.Router();
router.use(auth);
router.get('/', getBots);
router.post('/', createBot);
router.delete('/:id', deleteBot);
router.put('/:id', updateBot);  // <-- Added update route

export default router;
