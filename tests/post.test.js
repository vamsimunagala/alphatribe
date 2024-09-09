const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

describe('Post Management API', () => {
  let token;
  let postId;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    // Register and log in a test user
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });

    token = res.body.token;
  });

  afterAll(async () => {
    // Close the connection to the test database
    await mongoose.connection.close();
  });

  test('Should create a new stock post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        stockSymbol: 'AAPL',
        title: 'Apple Stock Discussion',
        description: 'Let\'s talk about Apple stock performance.',
        tags: ['AAPL', 'tech']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    postId = res.body.postId;
  });

  test('Should fetch all stock posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toEqual(true);
  });

  test('Should fetch a single post by id', async () => {
    const res = await request(app).get(`/posts/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Apple Stock Discussion');
  });
});
