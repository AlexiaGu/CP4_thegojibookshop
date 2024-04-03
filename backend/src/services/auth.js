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

    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    await jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

const verifyUserToken = (req, res, next) => {
  const infos = {
    idReader: req.body.idReader,
  };
  const token = req.cookies.auth;

  try {
    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    if (decodedToken.sub === infos.idReader) {
      console.info("Ok utilisateur vérifié");
      next();
    } else {
      console.info("erreur user non valide");
    }
  } catch (error) {
    next(error);
  }
};

const verifyUserTokenWithParams = (req, res, next) => {
  const infos = {
    idReader: parseInt(req.query.idReader, 10),
  };

  const token = req.cookies.auth;
  console.info("ici verify with params", infos.idReader);
  try {
    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    if (decodedToken.sub === infos.idReader) {
      console.info("ok ça passe");
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  hashPassword,
  verifyToken,
  verifyUserToken,
  verifyUserTokenWithParams,
};
