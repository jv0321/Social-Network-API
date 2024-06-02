const { model, Schema } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280, // Limiting reaction text to 280 characters
    },
    username: {
      type: String,
      required: true, // Who posted the reaction
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => createdAtVal.toISOString().split("T")[0], // Date formatting
    },
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;