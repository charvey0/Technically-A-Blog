const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    console.log(user.dataValues.id);
    if (user === null) {
        return done(null, false, {message: 'No user found.'});
    }
    try {
        if (await bcrypt.compare(password, user.hash)) {
            return done(null, user);
        } else {
           return done(null, false, {message: 'Incorrect password' });
        }
    } catch (error) {
      return done(error);    
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email"}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser( async (id, done) => {
      return done(null, await getUserById(id));
  });
}

module.exports = initialize