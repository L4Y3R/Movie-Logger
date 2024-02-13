const express = require("express");
const router = express.Router();
const Movie = require("../models/movieModel");
const requireAuth = require("../middleware/requireAuth");

const {
  getAllMovies,
  getOneMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movieController");

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
  "moviePosters"
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

router.use(requireAuth);

router.get("/", getAllMovies);

router.get("/:id", getOneMovie);

router.post("/", upload.single("poster"), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null;
  const { title, director, releaseYear, runtime, review } = req.body;

  if (!title) {
    if (fileName != null) {
      removeBookCover(fileName);
    }
    return res.status(400).json({ error: "Please fill in the title" });
  }

  if (!fileName) {
    return res.status(400).json({ error: "Please upload a poster" });
  }

  try {
    const user_id = req.user._id;
    const movie = await Movie.create({
      title,
      director,
      releaseYear,
      runtime,
      poster: fileName,
      review,
      user_id,
    });
    res.status(200).json(movie);
  } catch (error) {
    if (fileName != null) {
      removeBookCover(fileName);
    }

    res.status(400).json({ error: error.message });
    console.log(error);
  }
});

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

router.patch("/:id", updateMovie);

router.delete("/:id", deleteMovie);

module.exports = router;
