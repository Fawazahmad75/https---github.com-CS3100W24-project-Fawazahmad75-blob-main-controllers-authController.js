// auth.test.js
import { expect as _expect, use, request } from 'chai';
import chaiHttp from 'chai-http'; // If using chai-http
const expect = _expect;
use(chaiHttp);

import app from '../index'; // Assuming you export your express app in an app.js file

describe('Authentication Tests', function() {
  let createdPlayerId;

  describe('POST /register', function() {
    it('should register a new player', function(done) {
      request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Player registered successfully');
          createdPlayerId = res.body._id; // Assuming you return the created player ID
          done();
        });
    });
  });

  describe('POST /login', function() {
    it('should login the player and return a token', function(done) {
      request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

  describe('POST /assignCashToPlayer', function() {
    it('should assign cash to the player', function(done) {
      request(app)
        .post('/assignCashToPlayer')
        .send({
          username: 'testUser', // Make sure this user exists or is created during these tests
          cashAmount: 1000,
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Cash assigned successfully');
          expect(res.body.player.cash).to.equal(1000);
          done();
        });
    });
  });

  // Additional tests can be added here
});
