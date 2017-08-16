const filesystem = require('fs');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
let robots;

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

//PARSE THROUGH THE ROBOT JSON FILE
filesystem.readFile('users.json', function(err, contents) {
  robots = JSON.parse(contents);

  //A COMFORTING METHOD TO SEE THE CONTENTS OF FILE
  // for (let i = 0; i < robots.users.length; i++) {
  //   console.log(`User: ${robots.users[i].name}, Job: ${robots.users[i].job}, Company: ${robots.users[i].company}`);
  // }
});

app.get('/', function(req, res) {
  res.render('index', {
    //TODO: need to push value of robots to mustache document
  });
});


//When user is clicked, bring them this information.
app.get('/users/:userName', function(req, res) {
  res.send('Welcome to the page of ' + req.params.userName);
})

app.listen(3000, function() {
  console.log('Mad successes happenin here!')
});
