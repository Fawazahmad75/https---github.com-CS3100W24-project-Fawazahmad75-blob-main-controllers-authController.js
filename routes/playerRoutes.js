import { Router } from 'express';
const router = Router();
import authMiddleware from '../middlewares/authMiddleware';
import { buyStock, sellStock, getPlayerPortfolio, getPlayerProfile ,updatePlayerProfile} from '../controllers/playerController';

// Protected routes
router.use(authMiddleware);

// Route to buy stock
router.post('/buy-stock', buyStock);

// Route to sell stock
router.post('/sell-stock', sellStock);

// Route to get player portfolio
router.get('/:username/portfolio', getPlayerPortfolio);
// Route to get player profile
router.get('/:username/profile', getPlayerProfile);

router.put('/profile/:username',updatePlayerProfile);

router.put('/:username/portfolio/update', updatePlayerPortfolioValue);

export default router;
/*
router.post('/buy', async (req, res) => {
    // Simplified: { playerId, stockSymbol, quantity }
    const { playerId, stockSymbol, quantity } = req.body;
    
    // Here, you'd look up the current price of the stockSymbol,
    // calculate the total cost, and update the player's portfolio and cash.
    // This example won't implement the actual trading logic.
    
    res.send('Buy action processed');
  });
  
  router.post('/sell', async (req, res) => {
    // Similar structure to the buy endpoint
    res.send('Sell action processed');
  });
  */