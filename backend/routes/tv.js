const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  createTv,
  getAllTv,
  getOneTv,
  deleteTv,
  updateTv,
} = require("../controllers/tvController");

const path = require("path");
const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

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

router.use(requireAuth);

router.get("/", getAllTv);

router.get("/:id", getOneTv);

router.post("/", upload.single("postertv"), createTv);

router.patch("/:id", updateTv);

router.delete("/:id", deleteTv);

module.exports = router;
