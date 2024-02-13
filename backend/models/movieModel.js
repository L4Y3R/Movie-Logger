const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviePosterBasePath = "/uploads/moviePosters";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
    },
    releaseYear: {
      type: Number,
    },
    runtime: {
      type: Number,
    },
    poster: {
      type: String,
      required: true,
    },
    review: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MoviesModel", movieSchema);
module.exports.moviePosterBasePath = moviePosterBasePath;
