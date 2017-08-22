const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static('views')); 

let client = require ('mongodb').MongoClient;
let data = require('./data');

client.connect('mongodb://localhost:27017/test', function(err, db) {
  let robots = db.collection('items');
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/jobless', function(req, res) {
    robots.find({ job: null }).toArray().then(function(robots) {
      res.render('jobless', {
        joblessUsers: robots,
      });
    });
  });

  app.get('/employed', function(req, res) {
      robots.find({ job: /.+/ }).toArray().then(function(robots) {
        res.render('employed', {
          employedUsers: robots,
        });
    });
  });

  app.listen(3000, function() {
    console.log('Mad successes happenin here!');
  });
});
