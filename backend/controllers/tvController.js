const Tv = require("../models/tvModel");
const mongoose = require("mongoose");

//get all
const getAllTv = async (req, res) => {
  try {
    const tv = await Tv.find({}).sort({ createdAt: -1 });
    res.status(200).json(tv);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//get one
const getOneTv = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "The ID is not valid" });
    }

    const tv = await Tv.findById(id);

    if (!tv) {
      return res.status(404).json({ error: "No such tv series" });
    }

    res.status(200).json(tv);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// create movie
const createTv = async (req, res) => {
  const {
    title,
    creator,
    firstRelease,
    lastRelease,
    seasons,
    season,
    episode,
    review,
  } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Please fill in the title" });
  }

  try {
    const tv = await Tv.create({
      title,
      creator,
      firstRelease,
      lastRelease,
      seasons,
      season,
      episode,
      review,
    });
    res.status(200).json(tv);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//update movie
const updateTv = async (req, res) => {
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

    const tv = await Tv.findByIdAndUpdate(
      { _id: id },
      { $set: updateObject },
      { new: true }
    );

    if (!tv) {
      return res.status(404).json({ error: "No such tv show" });
    }

    res.status(200).json(tv);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//delete movie
const deleteTv = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "The ID is not valid" });
    }

    const tv = await Tv.findByIdAndDelete({ _id: id });

    if (!tv) {
      return res.status(404).json({ error: "No such tv show" });
    }

    res.status(200).json(tv);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = { createTv, getAllTv, getOneTv, deleteTv, updateTv };
