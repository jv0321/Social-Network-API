const { model, Schema } = require("mongoose");
const { hash, compare } = require("bcrypt");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxLength: 280, // Limiting thought text to 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => createdAtVal.toISOString().split("T")[0], // Date formatting
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      type: Schema.Types.ObjectId,
      ref: "Reaction",
    },
  },
  {
    toJSON: { getters: true, virtual: true },
    id: false,
  }
);

// thoughtSchema.virtual('reactionCount').get(function() {
//   return this.reactions.length;
// });

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;