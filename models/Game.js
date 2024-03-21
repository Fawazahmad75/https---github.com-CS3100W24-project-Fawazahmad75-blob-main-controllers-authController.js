import { Schema, model } from 'mongoose';

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  // You can add more properties here as needed
});

export default model('Game', GameSchema);