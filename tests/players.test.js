const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('# Players Tests', () => {
  describe('List of players', () => {
    it('should return 200 status and list players ordered by rank', (done) => {
      chai.request(app)
        .get('/players')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.be.deep.equal([
            {
              "id": 17,
              "firstname": "Rafael",
              "lastname": "Nadal",
              "shortname": "R.NAD",
              "sex": "M",
              "country": {
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Espagne.png",
                "code": "ESP"
              },
              "picture": "https://data.latelier.co/training/tennis_stats/resources/Nadal.png",
              "data": {
                "rank": 1,
                "points": 1982,
                "weight": 85000,
                "height": 185,
                "age": 33,
                "last": [1, 0, 0, 0, 1]
              }
            },
            {
              "id": 52,
              "firstname": "Novak",
              "lastname": "Djokovic",
              "shortname": "N.DJO",
              "sex": "M",
              "country": {
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
                "code": "SRB"
              },
              "picture": "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
              "data": {
                "rank": 2,
                "points": 2542,
                "weight": 80000,
                "height": 188,
                "age": 31,
                "last": [1, 1, 1, 1, 1]
              }
            },
            {
              "id": 102,
              "firstname": "Serena",
              "lastname": "Williams",
              "shortname": "S.WIL",
              "sex": "F",
              "country": {
                "picture": "https://data.latelier.co/training/tennis_stats/resources/USA.png",
                "code": "USA"
              },
              "picture": "https://data.latelier.co/training/tennis_stats/resources/Serena.png",
              "data": {
                "rank": 10,
                "points": 3521,
                "weight": 72000,
                "height": 175,
                "age": 37,
                "last": [0, 1, 1, 1, 0]
              }
            },
            {
              "id": 65,
              "firstname": "Stan",
              "lastname": "Wawrinka",
              "shortname": "S.WAW",
              "sex": "M",
              "country": {
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Suisse.png",
                "code": "SUI"
              },
              "picture": "https://data.latelier.co/training/tennis_stats/resources/Wawrinka.png",
              "data": {
                "rank": 21,
                "points": 1784,
                "weight": 81000,
                "height": 183,
                "age": 33,
                "last": [1, 1, 1, 0, 1]
              }
            },
            {
              "id": 95,
              "firstname": "Venus",
              "lastname": "Williams",
              "shortname": "V.WIL",
              "sex": "F",
              "country": {
                "picture": "https://data.latelier.co/training/tennis_stats/resources/USA.png",
                "code": "USA"
              },
              "picture": "https://data.latelier.co/training/tennis_stats/resources/Venus.webp",
              "data": {
                "rank": 52,
                "points": 1105,
                "weight": 74000,
                "height": 185,
                "age": 38,
                "last": [0, 1, 0, 0, 1]
              }
            }
          ]);
          done()
        })
    });
  });

  describe('Get specific player by id', () => {
    it('should return 400 status with qualified error if wrong parameter is given', (done) => {
      chai.request(app)
        .get('/players/id/test')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.be.deep.equal({
            "params": {
              "id": "test"
            },
            "errors": [
              {
                "value": "test",
                "msg": "Player's id cannot be empty and must be numeric.",
                "param": "id",
                "location": "params"
              }
            ]
          });
          done()
        })
    });
    it('should return 404 status with qualified error if id doesnt exists', (done) => {
      chai.request(app)
        .get('/players/id/10')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.be.deep.equal({
            "error": "Player 10 not found"
          });
          done()
        })
    });
    it('should return 200 status if id exists', (done) => {
      chai.request(app)
        .get('/players/id/17')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.deep.equal({
            "id": 17,
            "firstname": "Rafael",
            "lastname": "Nadal",
            "shortname": "R.NAD",
            "sex": "M",
            "country": {
              "picture": "https://data.latelier.co/training/tennis_stats/resources/Espagne.png",
              "code": "ESP"
            },
            "picture": "https://data.latelier.co/training/tennis_stats/resources/Nadal.png",
            "data": {
              "rank": 1,
              "points": 1982,
              "weight": 85000,
              "height": 185,
              "age": 33,
              "last": [1, 0, 0, 0, 1]
            }
          });
          done()
        })
    });
  });

  describe('Retrieve players stats (ratio, BMI, height median)', () => {
    it('should return 200 status with correct stats', (done) => {
      chai.request(app)
        .get('/players/stats')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.deep.equal({
            "ratio": {
              "USA": 2.1666666666666665,
              "SRB": 5,
              "SUI": 4,
              "ESP": 0.6666666666666666
            },
            "bmi": 23.357838995505837,
            "median": 1.85
          });
          done()
        })
    });
  });

});
