const mongoose = require('mongoose');

const { Schema } = mongoose;

const playlistSchema = new Schema({
    name: {
        type: string,
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
