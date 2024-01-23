const express = require('express')
const router = express.Router()
const {createMovie, getAllMovies, getOneMovie, deleteMovie, updateMovie } = require('../controllers/movieController')

router.get('/', getAllMovies)

router.get('/:id', getOneMovie)

router.post('/', createMovie)

router.patch('/:id', updateMovie)

router.delete('/:id', deleteMovie)

module.exports = router