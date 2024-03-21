import { expect as _expect } from 'chai';
import { createSandbox, spy, stub } from 'sinon';
const expect = _expect;
import { buyStock, sellStock, getPlayerPortfolio, getPlayerProfile } from '../controllers/playerController';
import Player from '../models/Player';
import stockService from '../services/stockService';

describe('PlayerController', function() {
  let req, res, mockPlayer, sandbox;

  beforeEach(() => {
    // Reset the sandbox before each test
    sandbox = createSandbox();

    // Mock request and response objects
    req = {
      params: { username: 'testPlayer' },
      body: { stockSymbol: 'AAPL', quantity: 10 }
    };
    res = {
      json: spy(),
      status: stub().returnsThis()
    };

    // Mock player object
    mockPlayer = {
      _id: 'playerId',
      username: 'testPlayer',
      cash: 1000,
      portfolio: [],
      save: sandbox.stub().resolves()
    };
  });

  afterEach(() => {
    // Restore the sandbox to prevent memory leaks
    sandbox.restore();
  });

  describe('buyStock', function() {
    it('should buy stock successfully and update portfolio', async function() {
      sandbox.stub(Player, 'findOne').resolves(mockPlayer);
      sandbox.stub(stockService, 'getStockPrice').resolves(100);
      await buyStock(req, res);
      
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('message', 'Stock bought successfully');
    });
  });

  describe('sellStock', function() {
    it('should sell stock successfully and update portfolio', async function() {
      // Assuming the player already owns some stock
      mockPlayer.portfolio.push({ stockSymbol: 'AAPL', quantity: 20 });
      
      sandbox.stub(Player, 'findOne').resolves(mockPlayer);
      sandbox.stub(stockService, 'getStockPrice').resolves(100);
      await sellStock(req, res);

      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('message', 'Stock sold successfully');
    });
  });

  describe('getPlayerPortfolio', function() {
    it('should retrieve player portfolio successfully', async function() {
      sandbox.stub(Player, 'findOne').resolves(mockPlayer);
      await getPlayerPortfolio(req, res);

      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('message', 'Player portfolio retrieved successfully');
    });
  });

  describe('getPlayerProfile', function() {
    it('should retrieve player profile successfully', async function() {
      sandbox.stub(Player, 'findOne').resolves(mockPlayer);
      await getPlayerProfile(req, res);

      expect(res.json.calledOnce).to.be.true;
      expect(res.status.neverCalledWith(404)).to.be.true;
    });
  });

  
  describe('updatePlayerProfile', function() {
    let req, res, stub;

    beforeEach(() => {
      // Setup request and response objects
      req = {
        params: { username: 'testUser' },
        body: { cash: 500 }
      };
      res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      // Mock Player.findOneAndUpdate
      stub = sinon.stub(Player, 'findOneAndUpdate');
    });

    afterEach(() => {
      // Restore the original function after each test
      sinon.restore();
    });

    it('should update player profile successfully', async function() {
      // Arrange
      const mockPlayer = { username: 'testUser', cash: 500 };
      stub.resolves(mockPlayer);

      // Act
      await playerController.updatePlayerProfile(req, res);

      // Assert
      expect(stub.calledWith({ username: 'testUser' }, { cash: 500 }, { new: true })).to.be.true;
      expect(res.json.calledWith({ message: 'Player profile updated successfully', player: mockPlayer })).to.be.true;
    });

    it('should return 404 if player not found', async function() {
      // Arrange
      stub.resolves(null);

      // Act
      await playerController.updatePlayerProfile(req, res);

      // Assert
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Player not found' })).to.be.true;
    });
  });


  describe('updatePortfolioValue', function() {
    let mockPlayer, saveStub, priceStub;

    beforeEach(() => {
      // Mock player object with portfolio
      mockPlayer = {
        cash: 1000,
        portfolio: [
          { stockSymbol: 'AAPL', quantity: 10 },
          { stockSymbol: 'MSFT', quantity: 5 }
        ],
        save: sinon.stub().resolves()
      };

      // Stub the getStockPrice function
      priceStub = sinon.stub(stockService, 'getStockPrice');
      priceStub.withArgs('AAPL').resolves(100); // Assume AAPL's price is $100
      priceStub.withArgs('MSFT').resolves(200); // Assume MSFT's price is $200
    });

    afterEach(() => {
      // Restore stubbed methods
      sinon.restore();
    });

    it('should correctly update the portfolio value based on stock prices', async function() {
      // Calculate expected portfolio value: 1000 + (10 * 100) + (5 * 200)
      const expectedPortfolioValue = 1000 + (10 * 100) + (5 * 200);

      const updatedPlayer = await playerController.updatePortfolioValue(mockPlayer);

      // Verify the portfolio value was updated correctly
      expect(updatedPlayer.portfolioValue).to.equal(expectedPortfolioValue);
      // Ensure the player's save method was called
      expect(mockPlayer.save.calledOnce).to.be.true;
    });
  });
});
