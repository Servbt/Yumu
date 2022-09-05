const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  videoID: {
    type: String
  },
  image: {
    type: String
  }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
