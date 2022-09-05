const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaylistTest2Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const PlaylistTest2 = mongoose.model('PlaylistTest2', PlaylistTest2Schema);

module.exports = PlaylistTest2;
