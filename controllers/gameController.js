import Game from '../models/Game';
import Player from '../models/Player';

const createGame = async (req, res) => {
  // Check if user is admin (you need to implement admin role check logic)
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Only admin users can create games' });
  }

  // Create a new game
  const { name } = req.body;
  const game = new Game({name});
    // Add alongside name in the paramenters above , any game properties you need
    // For example, start time, end time, etc.
  

  try {
    const savedGame = await game.save();
    res.json({ message: 'Game created successfully', game: savedGame });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const declareWinner = async (req, res) => {
    try {
      // Logic to determine the winner
      // This could involve querying the database for player portfolios and calculating the highest value
  
      // For demonstration purposes, let's assume we have a simple logic to find the player with the highest cash balance
      const winner = await Player.findOne().sort('-cash').select('username cash');
  
      if (!winner) {
        return res.status(404).json({ message: 'No winner found' });
      }
  
      res.json({ message: 'Winner declared', winner });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

export default { createGame, declareWinner};