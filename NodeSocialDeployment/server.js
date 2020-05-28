const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const httpProxy = require("http-proxy");

const bodyParser = require("body-parser");
// const compression = require("compression");
// const html = __dirname + "/public";
const path = require("path");

const cors = require("cors");
const _ = require("lodash");
// const logger = require('morgan');

const app = express();

app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const { User } = require("./Helpers/UserClass");

require("./socket/streams")(io, User, _);
require("./socket/private")(io);

const dbConfig = require("./config/secret");
const auth = require("./routes/authRoutes");
const posts = require("./routes/postRoutes");
const users = require("./routes/userRoutes");
const friends = require("./routes/friendsRoutes");
const message = require("./routes/messageRoutes");
const image = require("./routes/imageRoutes");

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Credentials', 'true');
// 	res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	);
// 	next();
// });
// function getRoot(request, response) {
//   response.sendFile(path.resolve("./public/index.html"));
// }

// function getUndefined(request, response) {
//   response.sendFile(path.resolve("./public/index.html"));
// }

// Note the dot at the beginning of the path
// app.use(express.static("./public"));

// app.get("/", getRoot);
// app.get("/*", getUndefined);
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());
// app.use(logger('dev'));

// mongoose.connect(dbConfig.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// httpProxy.createProxyServer({
//   target: "https://rocky-refuge-49490.herokuapp.com",
//   toProxy: true,
//   changeOrigin: true,
//   xfwd: true,
// });

app.use(express.static(__dirname + "/public"));

app.use("/api/chatapp", auth);
app.use("/api/chatapp", posts);
app.use("/api/chatapp", users);
app.use("/api/chatapp", friends);
app.use("/api/chatapp", message);
app.use("/api/chatapp", image);

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html")); // Set index.html as layout
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("Running on port:" + port);
});
