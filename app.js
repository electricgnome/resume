// converted to use sequelize instead of pgp
const express = require("express");
nunjucks = require("nunjucks");
body_parser = require("body-parser");
jsonfile = "/src/file.json";
// const Promise = require("bluebird");
// session = require("express-session");

// client = redis.createClient();
// RedisStore = require("connect-redis")(session);




var app = express();

const http = require("http").Server(app);


app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));


// var hour = 3600000;
// app.use(
//   session({
//     store: new RedisStore(),
//     secret: process.env.SECRET_KEY || "dev",
//     resave: true,
//     saveUninitialized: false,
//     cookie: { maxAge: 24 * hour }
//   })
// );

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});



app.get("/", function(request, response) {
  response.render("index.html");
});


//===========chat app----------------


var PORT = process.env.PORT || 8800;
http.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
