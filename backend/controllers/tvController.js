const Tv = require("../models/tvModel");
const mongoose = require("mongoose");

const fs = require("fs");
const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
const path = require("path");

const uploadPath = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "public",
  "uploads",
  "tvPosters"
);

const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

//get all
const getAllTv = async (req, res) => {
  const user_id = req.user._id;
  try {
    const tv = await Tv.find({ user_id }).sort({ createdAt: -1 });
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
  const fileName = req.file != null ? req.file.filename : null;

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
    if (fileName != null) {
      removePoster(fileName);
    }
    return res.status(400).json({ error: "Please fill in the title" });
  }

  if (!fileName) {
    return res.status(400).json({ error: "Please upload a poster" });
  }

  try {
    const user_id = req.user._id;
    const tv = await Tv.create({
      title,
      creator,
      firstRelease,
      lastRelease,
      seasons,
      season,
      episode,
      poster: fileName,
      review,
      user_id,
    });

    res.status(200).json(tv);
  } catch (error) {
    if (fileName != null) {
      removePoster(fileName);
    }
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

    if (tv.poster) {
      console.log("Deleting Poster:", tv.poster);
      removePoster(tv.poster);
    }

    res.status(200).json(tv);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

function removePoster(fileName) {
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

module.exports = { createTv, getAllTv, getOneTv, deleteTv, updateTv };
