const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const helpers = require('./utils/helpers')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const routes = require('./controllers')
const sequelize = require('./config/connection')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

const userSession = {
  // TODO this should go in env, and when deployed to Heroku, should be
  // set to an environment variable there
  secret: 'AB34CD56EF78GHIJ12%KLMN34OP56QR78ST90UV12WX34YZ56',
  cookie: {
    maxAge: 3600 * 1000, // 60 minutes
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(userSession))

// custom handlebars helpers defined in utils/helpers.js
const hbs = exphbs.create({ helpers })
app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
})
