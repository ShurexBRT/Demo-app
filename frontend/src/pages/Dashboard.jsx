import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch notes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/notes/${editingId}`,
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/notes',
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setTitle('');
      setContent('');
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      setError('Failed to save note');
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="mt-10 p-6 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Notes</h2>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 border px-2 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {editingId ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note._id} className="border p-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold">{note.title}</h3>
            <p className="text-gray-700 mt-1">{note.content}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(note)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
