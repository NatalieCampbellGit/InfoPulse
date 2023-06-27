const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

// ! TODO REMOVE THIS BEFORE PRODUCTION
// THIS IS TO ALLOW THE BROWSER TO ACCESS THE SERVER DURING TESTING
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const userSession = {
  // TODO this should go in env, and when deployed to Heroku, should be
  // set to an environment variable there
  secret: "AB34CD56EF78GHIJ12%KLMN34OP56QR78ST90UV12WX34YZ56",
  cookie: {
    maxAge: 3600 * 1000, // 60 minutes
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(userSession));

// custom handlebars helpers defined in utils/helpers.js
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
