const passport = require('passport');
const {Strategy: GoogleStrategy} = require('passport-google-oauth20'); 
require("dotenv").config(); 
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = require("../../db");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONT_DEV } = process.env;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
    // callbackURL: `${BASE_URL}/auth/google/callback`,
  callbackURL: `${FRONT_DEV}/api/google/callback`
  //   passReqToCallback: true,
}, async (_, __, profile, done) => {
      const account = profile._json; 
      let user = {}; 
    console.log("account", account);
  try {
   const currentUserQuery = await db.query('SELECT * FROM users WHERE google_id=$1', [account.sub])
   if(currentUserQuery.rows.length === 0) {
    console.log("currentUser", currentUserQuery);
await db.query(`
INSERT INTO users (name, google_id) 
VALUES ($1, $2)`,
  [account.name, account.sub])

  const id = await db.query('SELECT id FROM users WHERE google_id=$1', [account.sub])
user = {
  id: id.rows[0].id,
  name: account.name
}   
} else {
user = {
  id: currentUserQuery.rows[0].id,
  name: currentUserQuery.rows[0].name
}
   }
done(null, user)
  } catch (error) {
    done(error);
  }  
}));

passport.serializeUser((user, done) => {
  done(null, user); 
});

passport.deserializeUser((user, done) => {
  done(null, user);
})