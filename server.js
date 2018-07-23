// server.js
// where your node app starts

// init project
var express = require('express');

const checkEmptyString = require('./middlewares/checkEmptyString');
const validateString = require('./middlewares/validateString');

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?', checkEmptyString, validateString, (req, res) => {
  let date = null;
  
  if (req.unixTimestamp) {
    date = new Date(req.unixTimestamp);
  } else {
    date = new Date(req.params.date_string);
  }
  
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});