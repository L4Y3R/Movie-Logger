const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    creator:{
        type: String
    },
    firstRelease:{
        type: Number
    },
    lastRelease:{
        type: Number
    },
    seasons:{
        type: Number
    },
    season:{
        type: Number
    },
    episode:{
        type: Number
    },
    review:{
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('TvModel', tvSchema)