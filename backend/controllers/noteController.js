const Note = require('../models/Note');

// @desc    Get all notes for logged-in user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notes);
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const note = await Note.create({
    user: req.user._id,
    title,
    content,
  });

  res.status(201).json(note);
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  const updatedNote = await note.save();

  res.json(updatedNote);
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await note.deleteOne();

  res.json({ message: 'Note removed' });
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
