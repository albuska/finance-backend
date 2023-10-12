const passport = require('passport');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { v4: uuidv4 } = require("uuid");
const { Strategy } = require('passport-google-oauth2'); 
require("dotenv").config(); 
const db = require("../../db");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FRONT_DEV, BASE_URL } = process.env;

// let URL = process.env.NODE_ENV === "development" ? FRONT_DEV :  BASE_URL;

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
    const existingUserQuery = await db.query('SELECT * FROM users WHERE google_id=$1', [account.sub]);

    if (existingUserQuery.rows.length > 0) {
      done(null, existingUserQuery.rows[0]);

    } else {

      // const existingEmailQuery = await db.query('SELECT * FROM users WHERE email=$1', [account.email]);

      // if (existingEmailQuery.rows.length > 0) {
      //   return done(httpError(409, "Email in use"));
      // }

      const idUser = uuidv4();
      const password = await bcrypt.hash(uuidv4(), 10);

      await db.query(`
        INSERT INTO users (id, name, email, google_id, password, is_verified) 
        VALUES ($1, $2, $3, $4, $5, true)
        RETURNING id, name, email`,
        [idUser, account.name, account.email, account.sub, password]
      );

      const user = {
        id: idUser,
        name: account.name,
        email: account.email,
        password,
      };

      done(null, user);
    }
  } catch (e) {
    done(e, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;



