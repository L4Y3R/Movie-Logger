const express = require('express')
const router = express.Router()
const {createTv, getAllTv, getOneTv, deleteTv, updateTv} = require('../controllers/tvController')

router.get('/', getAllTv)

router.get('/:id', getOneTv)

router.post('/', createTv)

router.patch('/:id', updateTv)

router.delete('/:id', deleteTv)

module.exports =router