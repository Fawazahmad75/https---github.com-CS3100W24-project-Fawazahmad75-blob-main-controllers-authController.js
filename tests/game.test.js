import request from 'supertest';
import express from 'express';
import gameRoutes from '../routes/gameRoutes';
import { json } from 'body-parser';

const app = express();
app.use(json()); // For parsing application/json
app.use('/api/games', gameRoutes);

describe('Game Routes Integration Tests', function() {
  it('POST /api/games/createGame - should create a game', function(done) {
    request(app)
      .post('/api/games/createGame')
      .send({ name: 'New Game' })
      // Assuming some form of authentication, you might need to set a token header here
      // .set('Authorization', `Bearer ${token}`)
      .expect(200) // Adjust according to your actual status code for success
      .end(function(err, res) {
        if (err) return done(err);
        // Additional assertions can go here
        done();
      });
  });

  it('GET /api/games/declare-winner - should declare a winner', function(done) {
    request(app)
      .get('/api/games/declare-winner')
      // .set('Authorization', `Bearer ${token}`) // If your endpoint requires authentication
      .expect(200) // Adjust according to your actual status code
      .end(function(err, res) {
        if (err) return done(err);
        // Additional assertions can go here
        done();
      });
  });
});
