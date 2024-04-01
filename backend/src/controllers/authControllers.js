/* eslint-disable import/no-extraneous-dependencies */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const reader = await tables.reader.readByEmailWithPassword(req.body.email);
    if (reader.length === 0) {
      res.sendStatus(422);
    }

    const verified = await argon2.verify(reader[0].password, req.body.password);

    if (verified === true) {
      // sign permet de créer un token
      const token = await jwt.sign(
        {
          sub: reader[0].id,
          email: reader[0].email,
        },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("auth", token).json({ msg: "connexion réussie" });
    } else {
      res.sendStatus(422);
    }

    console.info(verified);
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
