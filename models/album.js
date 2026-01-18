const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    imageurl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ""
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    photos: [photoSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;