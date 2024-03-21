// models/Player.js
import { Schema, model } from 'mongoose';

const PlayerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { // For simplicity, though you'd want to hash this in a real app
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cash: {
    type: Number,
    default: 0, // Starting cash
  },
  portfolio: [{
    stockSymbol: String,
    quantity: Number,
  }],
});

export default model('Player', PlayerSchema);

