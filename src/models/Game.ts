import { Schema, Model, Document, Types, model } from "mongoose";

interface Game extends Document {
  userId: Types.ObjectId;
  players: [{ name: string; points: number; isWinner: boolean }];
  totalRounds: number;
  currentRound: number;
  match: [
    {
      round: number;
      players: [{ name: string; points: number; isWinner: boolean }];
    }
  ];
}

const GameSchema = new Schema<Game, Model<Game>>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    players: [
      {
        name: { type: String, required: true },
        points: { type: Number, default: 0 },
        isWinner: { type: Boolean, default: false },
      },
    ],
    totalRounds: {
      type: Number,
      required: true,
    },
    currentRound: {
      type: Number,
      default: 1,
    },
    match: [
      {
        round: Number,
        players: [{ name: String, points: { type: Number, default: 0 } }],
      },
    ],
  },
  {
    timestamps: true,
    collection: "game",
  }
);

export default model<Game, Model<Game>>("Game", GameSchema);
