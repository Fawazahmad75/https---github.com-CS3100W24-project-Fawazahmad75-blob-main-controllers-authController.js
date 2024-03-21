import { Router } from 'express';
const router = Router();
import { register, login, assignCashToPlayer } from '../controllers/authController';

// POST route for user registration
router.post('/register', register);

// POST route for user login
router.post('/login', login);

// POST route for assigning intial ammount to the player.
router.post('/assignCashToPlayer', assignCashToPlayer)

export default router;
