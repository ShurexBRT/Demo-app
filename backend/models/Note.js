const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is obligatory']
  },
  content: {
    type: String,
    required: [true, 'Content is obligatory']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
