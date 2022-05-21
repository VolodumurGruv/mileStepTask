if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const exp = require("express");
const app = exp();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongo");
const cors = require("cors");
const routes = require("./routes/routes");

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.mdUrl;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const store = new MongoDBStore({
  mongoUrl: dbUrl,
  secret: "somesecretwillbehere",
  touchAfter: 24 * 3600,
});

store.on("error", (e) => console.error(`Session store error: ${e}`));

const sessionConfig = {
  store,
  name: "session",
  secret: "somesecretwillbehere",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(cors());
app.use(session(sessionConfig));
app.use(exp.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
