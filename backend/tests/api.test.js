const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const Note = require('../models/Note');

let token;
let noteId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clean up any existing users
  await User.deleteMany({});
  await Note.deleteMany({});

  // Register new user
  await request(app).post('/api/users/register').send({
    email: 'testuser@example.com',
    password: 'Test1234',
  });

  // Login
  const res = await request(app).post('/api/users/login').send({
    email: 'testuser@example.com',
    password: 'Test1234',
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Notes API', () => {
  test('Should create a new note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Note',
        content: 'Test content',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Note');
    noteId = res.body._id;
  });

  test('Should get all notes', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Should update a note', async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Title',
        content: 'Updated content',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  test('Should delete a note', async () => {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Note removed');
  });

  test('Should fail without token', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).toBe(401);
  });
});
