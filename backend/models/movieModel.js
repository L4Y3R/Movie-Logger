const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");

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
  },
  { timestamps: true }
);

movieSchema.virtual("posterPath").get(function () {
  if (this.poster != null) {
    return path.join("/", moviePosterBasePath, this.poster);
  }
});

module.exports = mongoose.model("MoviesModel", movieSchema);
module.exports.moviePosterBasePath = moviePosterBasePath;
