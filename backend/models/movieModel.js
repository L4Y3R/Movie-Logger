const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    director:{
        type: String
    },
    releaseYear:{
        type: Number
    },
    runtime:{
        type: Number
    },
    review:{
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('MoviesModel', movieSchema)