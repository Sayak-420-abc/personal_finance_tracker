import { Router } from 'express';
import { initUser } from '../controllers/userController.js';

const router = Router();

// POST /api/users/init — Clerk webhook / manual init
router.post('/init', initUser);

export default router;
