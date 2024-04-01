/* eslint-disable import/no-extraneous-dependencies */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashedPassword = hashedPassword;
    // pour supprimer le password en clair une fois celui-ci hashé
    delete req.body.password;
    console.info("HASHED PASSWORD", req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    // do something
    console.info("ptit cookie", req.cookies.auth);

    const token = req.cookies.auth;

    const verified = await jwt.verify(token, process.env.APP_SECRET);
    console.info(verified);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { hashPassword, verifyToken };
