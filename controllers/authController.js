import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import { validationResult } from 'express-validator';
import { registerValidation, loginValidation } from '../utils/ValidationUtils';

import Player from '../models/Player';
import Player from '../models/Player';
const register = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if user already exists
  const emailExists = await Player.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Hash password
  const salt = await genSalt(10);
  const hashedPassword = await hash(req.body.password, salt);

  // Create new user
  const player = new Player({
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedPlayer = await player.save();
    res.json({ message: 'Player registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if user exists
  const player = await Player.findOne({ email: req.body.email });
  if (!player) {
    return res.status(400).json({ message: 'Email or password is incorrect' });
  }

  // Check password
  const validPassword = await compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Email or password is incorrect' });
  }

  // Create and assign JWT token
  const token = sign({ _id: player._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).json({ token });
};
const assignCashToPlayer = async (req, res) => {
    try {
      const { username, cashAmount } = req.body;
  
      // Find player by username
      const player = await Player.findOne({ username });
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      // Assign cash amount to player
      player.cash = cashAmount;
      await player.save();
  
      res.json({ message: 'Cash assigned successfully', player });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  


export default { register, login, assignCashToPlayer };
