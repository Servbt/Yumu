const mongoose = require('mongoose');

process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-shopping',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

module.exports = mongoose.connection;
