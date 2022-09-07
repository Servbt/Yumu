const mongoose = require('mongoose');

const { Schema } = mongoose;

const playlistSchema = new Schema({
    owner:{
        type: String,
    },
    name: {
        type: String,
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
