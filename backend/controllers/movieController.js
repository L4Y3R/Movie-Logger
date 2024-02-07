const Movie = require("../models/movieModel");
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");
const uploadPath = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "public",
  "uploads",
  "moviePosters"
);

//get all
const getAllMovies = async (req, res) => {
  try {
    const movie = await Movie.find({}).sort({ createdAt: -1 });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//get one
const getOneMovie = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "The ID is not valid" });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "No such movie" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//update movie
const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "The ID is not valid" });
    }

    const updateObject = {};
    for (const key in req.body) {
      if (req.body[key] !== "") {
        updateObject[key] = req.body[key];
      }
    }

    const movie = await Movie.findByIdAndUpdate(
      { _id: id },
      { $set: updateObject },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ error: "No such movie" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//delete movie
const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "The ID is not valid" });
    }

    const movie = await Movie.findByIdAndDelete({ _id: id });

    if (!movie) {
      return res.status(404).json({ error: "No such movie" });
    }

    if (movie.poster) {
      console.log("Deleting Poster:", movie.poster);
      removeBookCover(movie.poster);
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

function removeBookCover(fileName) {
  const filePath = path.join(uploadPath, fileName);
  console.log("Deleting file:", filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully.");
    }
  });
}

module.exports = {
  getAllMovies,
  getOneMovie,
  deleteMovie,
  updateMovie,
};
