const path = require('path');


// express
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const app = express();

// handlebars
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// other
const bcrypt = require('bcrypt');


//sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const PORT = process.env.PORT || 3001;

const passport = require('passport');

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const initializePassport = require('./passport-config');
const User = require('./models/User');
initializePassport(
  passport, 
  email => { return User.findOne({ where: { email: email } })}, 
  id => { return User.findOne({ where: { id: id } })}, 
  );


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./controllers/'));


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));
});
