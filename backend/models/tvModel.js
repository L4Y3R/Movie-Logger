const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviePosterBasePath = "/uploads/tvPosters";

const tvSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
    },
    firstRelease: {
      type: Number,
    },
    lastRelease: {
      type: Number,
    },
    seasons: {
      type: Number,
    },
    season: {
      type: Number,
    },
    episode: {
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

module.exports = mongoose.model("TvModel", tvSchema);
module.exports.moviePosterBasePath = moviePosterBasePath;
