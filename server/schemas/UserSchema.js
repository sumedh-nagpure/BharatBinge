const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  movieRating: { type: Number, required: true },
  movieBackdropPath: { type: String, required: true },
  originalId: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },

  watchlist: [movieSchema],
  likes: [movieSchema],
  dislikes: [movieSchema],
  createdAt: { type: Date, default: Date.now },
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
