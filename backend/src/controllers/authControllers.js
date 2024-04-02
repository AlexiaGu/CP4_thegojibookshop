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
      const token = await jwt.sign(
        {
          sub: reader[0].id,
          email: reader[0].email,
        },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res
        .cookie("auth", token, {
          httpOnly: true,
          sameSite: "Lax",
        })
        .json({
          msg: "Connexion réussie",
          id: reader[0].id,
          email: reader[0].email,
          username: reader[0].username,
          // token,
        });
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

const isAllowed = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    next();
  }
};

const disconnected = async (req, res, next) => {
  try {
    res.clearCookie("auth").sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, disconnected, isAllowed };
