const passport = require('passport');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { v4: uuidv4 } = require("uuid");
// const {Strategy: GoogleStrategy} = require('passport-google-oauth2'); 
const { Strategy } = require('passport-google-oauth2'); 
require("dotenv").config(); 
const db = require("../../db");
const { httpError } = require('../../helpers');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONT_DEV } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `https://finance-backend-eight.vercel.app/api/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const account = profile._json;
  try {
    // const { email, displayName, picture } = profile;
    console.log("account", account);
    // console.log("email", email);
    // const user = await Users.findOne({ email });
    // if (user) {
    //   return done(null, user);
    // }
    // const password = await bcrypt.hash(uuid.v4(), 10);
    // const avatarURL = picture;
    // const newUser = await Users.create({
    //   email,
    //   password,
    //   name: displayName,
    //   avatarURL,
    // });
    // done(null, newUser);
        const existingUserQuery = await db.query('SELECT * FROM users WHERE google_id=$1', [account.sub]);

    if (existingUserQuery.rows.length > 0) {
      return done(httpError(409, "User already exists"));
    }

    const existingEmailQuery = await db.query('SELECT * FROM users WHERE email=$1', [account.email]);

    if (existingEmailQuery.rows.length > 0) {
      return done(httpError(409, "Email in use"));
    }

    const idUser = uuidv4();
    const password = await bcrypt.hash(uuidv4(), 10);

    await db.query(`
      INSERT INTO users (id, name, email, google_id, password) 
      VALUES ($1, $2, $3, $4, $5)`,
      [idUser, account.name, account.email, account.sub, password]
    );

    user = {
      id: idUser,
      name: account.name,
      email: account.email,
      password,
    };

    done(null, user);
  } catch (e) {
    done(e, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;

// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: `${FRONT_DEV}/api/auth/google/callback`,
//   passReqToCallback: true,

// }, async (req, _, __, profile, done) => {
//   const account = profile._json;
//   try {
//     const existingUserQuery = await db.query('SELECT * FROM users WHERE google_id=$1', [account.sub]);

//     if (existingUserQuery.rows.length > 0) {
//       return done(httpError(409, "User already exists"));
//     }

//     const existingEmailQuery = await db.query('SELECT * FROM users WHERE email=$1', [account.email]);

//     if (existingEmailQuery.rows.length > 0) {
//       return done(httpError(409, "Email in use"));
//     }

//     const idUser = uuidv4();
//     const password = await bcrypt.hash(uuidv4(), 10);

//     await db.query(`
//       INSERT INTO users (id, name, email, google_id, password) 
//       VALUES ($1, $2, $3, $4, $5)`,
//       [idUser, account.name, account.email, account.sub, password]
//     );

//     user = {
//       id: idUser,
//       name: account.name,
//       email: account.email,
//       password,
//     };

//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user); 
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// })