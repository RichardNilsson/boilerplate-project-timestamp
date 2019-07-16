// server.js
// where your node app starts

// Make use of .env
require('dotenv').config();
// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/:date_string?', (req, res, next) => {
  // date_string will be undefined if it is left empty
  // i.e. if user goes to [project_url]/api/timestamp/
  // Check to see that date_string is not undefined
  if (req.params.date_string !== undefined) {
    if ((new Date(req.params.date_string)).toString() !== 'Invalid Date') {
      req.time = new Date(req.params.date_string).toUTCString();
      req.unix = new Date(req.params.date_string).getTime();
    } else {
      req.unix = Number(req.params.date_string);
      req.time = new Date(Number(req.params.date_string)).toUTCString();
    }
  } else {
    // This is the case where date_string is undefined
    // This will show the current date from the server
    req.time = new Date().toUTCString();
    req.unix = new Date().getTime();
  }
  next();
}, (req, res) => {
  if (req.time === 'Invalid Date') {
    res.json({ "error": req.time });
  } else {
    res.json({ "unix": req.unix, "utc": req.time });
  }
});



// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
