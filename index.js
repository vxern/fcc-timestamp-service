// index.js
// where your node app starts
require("dotenv").config();

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (request, response) => {
  const { date: parameter } = request.params;

  let date;
  if (!parameter) {
    date = new Date();
  } else if (!isNaN(parameter)) {
    date = new Date(Number(parameter));
  } else {
    date = new Date(parameter);
  }

  const isValid = !isNaN(date.valueOf());
  if (!isValid) {
    return response.json({ "error": "Invalid Date" });
  }

  const { unix, utc } = { unix: date.valueOf(), utc: date.toUTCString() };

  return response.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
