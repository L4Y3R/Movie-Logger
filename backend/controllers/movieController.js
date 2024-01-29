const Movie = require("../models/movieModel");
const mongoose = require("mongoose");

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

// create movie
const createMovie = async (req, res) => {
  const { title, director, releaseYear, runtime, review } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Please fill in the title" });
  }

  try {
    const movie = await Movie.create({
      title,
      director,
      releaseYear,
      runtime,
      review,
    });
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

    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = {
  createMovie,
  getAllMovies,

  getOneMovie,
  deleteMovie,
  updateMovie,
};
