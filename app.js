// converted to use sequelize instead of pgp
const express = require("express");
nunjucks = require("nunjucks");
body_parser = require("body-parser");
jsonfile = "/src/file.json";
const Promise = require("bluebird");
session = require("express-session");
redis = require("redis"),
client = redis.createClient();
RedisStore = require("connect-redis")(session);




var app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);



app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));


var hour = 3600000;
app.use(
  session({
    store: new RedisStore(),
    secret: process.env.SECRET_KEY || "dev",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * hour }
  })
);
const sharedsession = require("express-socket.io-session");

io.use(sharedsession(session({
  store: new RedisStore(),
  secret: process.env.SECRET_KEY || "dev",
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 24 * hour }
})));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});



//Todo APPl

app.get("/", function(request, response) {
  response.render("index.html");
});


//===========chat app----------------

app.use("/socket-io", express.static("node_modules/socket.io-client/dist"));

var users=[];
io.on("connection", function(client) {
  // console.log(client.id + " CONNECTED");
  // client.emit("message", "Welcome!")
  // client.users=[];  
  // io.emit("users", client.users)

  client.on('user', function(user){
    client.username=user;
    console.log("user: " + client.username)
    if (!users.includes(user)){
      users.push(user)
    }
    
    io.emit("users", users)
    console.log("list of users: " + users)
  })


  client.on("incoming", function(msg, user) {
    io.emit("chat-msg", user, msg);
  });

  

  client.on("disconnect", function(user) {
    client.emit("message", client.username + " has left the room.")
    console.log(client.username + " EXITED");
  });
});
//===============-------------------------



http.listen(8800, function() {
  console.log("Listening on port 8800");
});
