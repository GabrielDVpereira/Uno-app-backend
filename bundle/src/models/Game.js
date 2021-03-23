"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var GameSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    collection: "game",
});
exports.default = mongoose_1.model("Game", GameSchema);
