import { Router } from 'express';
const router = Router();
import { createGame, declareWinner } from '../controllers/gameController';

// Implement game management routes here

router.post('/createGame', createGame);
router.get('/declare-winner', declareWinner);

export default router;