const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

// All routes below are protected (require valid token)
router.route('/')
  .get(protect, getNotes)      // GET /api/notes - fetch all notes
  .post(protect, createNote);  // POST /api/notes - create new note

router.route('/:id')
  .put(protect, updateNote)    // PUT /api/notes/:id - update note
  .delete(protect, deleteNote);// DELETE /api/notes/:id - delete note

module.exports = router;
