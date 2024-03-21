import Player from '../models/Player';
import { getStockPrice } from '../services/stockService';

const updatePortfolioValue = async (player) => {
  let portfolioValue = player.cash;
  for (const stock of player.portfolio) {
    const stockPrice = 100// need to get realtime stock price , not implemented yet
    portfolioValue += stockPrice * stock.quantity;
  }
  player.portfolioValue = portfolioValue;
  await player.save();
};

const buyStock = async (req, res) => {
  try {
    // Logic for buying stock...
    // After updating player's portfolio, call updatePortfolioValue(player)
    await updatePortfolioValue(Playerlayer);

    res.json({ message: 'Stock bought successfully', Playerlayer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sellStock = async (req, res) => {
  try {
    // Logic for selling stock...
    // After updating player's portfolio, call updatePortfolioValue(player)
    await updatePortfolioValue(Player);

    res.json({ message: 'Stock sold successfully', Player });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlayerPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    // Find player by username
    const player = await Player.findOne({ username });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Update portfolio value
    await updatePortfolioValue(player);

    res.json({ message: 'Player portfolio retrieved successfully', player });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPlayerProfile = async (req, res) => {
    try {
      const { username } = req.params;
  
      // Find player by username
      const player = await Player.findOne({ username });
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      // Remove sensitive data like password from the response
      const { password, ...playerProfile } = player.toObject();
  
      res.json(playerProfile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const  updatePlayerProfile = async (req, res) => {
    try {
      const { username } = req.params;
      const updateData = req.body;
  
      const player = await Player.findOneAndUpdate({ username }, updateData, { new: true });
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      res.json({ message: 'Player profile updated successfully', player });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export default { buyStock, sellStock, getPlayerPortfolio, getPlayerProfile, updatePlayerProfile,updatePortfolioValue };
