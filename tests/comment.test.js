const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

describe('Comment API', () => {
  let token;
  let postId;

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    // Register and login the user
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

    // Create a post to comment on
    const post = await request(app).post('/posts').set('Authorization', `Bearer ${token}`).send({
      stockSymbol: 'TSLA',
      title: 'Tesla Stock Discussion',
      description: 'Let\'s talk about Tesla stock performance.',
    });

    postId = post.body.postId;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Should add a comment to a post', async () => {
    const res = await request(app)
      .post(`/posts/${postId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        comment: 'I think Tesla will go higher this quarter.'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
  });
});
