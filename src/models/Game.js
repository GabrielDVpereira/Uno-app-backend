import mongoose from "mongoose";

const Game = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    players: [
      {
        name: { type: String, required: true },
        points: { type: Number, default: 0 },
        isWinner: { type: Boolean, default: false },
      },
    ],
    rounds: {
      type: Number,
      required: true,
    },
    currentRound: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Game", Game);
