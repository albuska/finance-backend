const passport = require('passport');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { v4: uuidv4 } = require("uuid");
const {Strategy: GoogleStrategy} = require('passport-google-oauth20'); 
require("dotenv").config(); 
const db = require("../../db");
const { httpError } = require('../../helpers');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONT_DEV } = process.env;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${FRONT_DEV}/api/google/callback`
  // callbackURL: `${BASE_URL}api/google/callback`

}, async (req, _, __, profile, done) => {
      const account = profile._json; 
      let user = {}; 
  try {
    const password = await bcrypt.hash(uuid.v4(), 10);

   const currentUserQuery = await db.query('SELECT * FROM users WHERE google_id=$1', [account.sub])
console.log("currentUserQuery", currentUserQuery);
   if(currentUserQuery.rows.length === 0 && account.email !== currentUserQuery.rows[0].email) {
    const idUser = uuidv4();

await db.query(`
INSERT INTO users (id, name, email, google_id, password) 
VALUES ($1, $2, $3, $4, $5)`,
  [idUser, account.name, account.email, account.sub, password])

  const id = await db.query('SELECT id, email FROM users WHERE google_id=$1', [account.sub])
console.log("id ===>", id);
  user = {
  id: id.rows[0].id,
  name: account.name,
  email: account.email,
  password
}   

} else {
  throw httpError(409, "Email in use");
// user = {
//   id: currentUserQuery.rows[0].id,
//   name: currentUserQuery.rows[0].name,
//   email: currentUserQuery.rows[0].email,
//   password
// }
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