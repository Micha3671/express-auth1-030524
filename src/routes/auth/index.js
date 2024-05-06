const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");
const AccessTokens = require("../../services/auth/AccessToken");
const winston = require("../logger"); // Importiere Winston

const AuthRouter = Router();

// POST REQUESTS
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    winston.error("Invalid request: Missing email or password");
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  const user = await UserModel.findOne({ where: { email } });

  if (!user || user.password !== password) {
    winston.error("Unauthorized: Invalid email or password");
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }

  const myToken = AccessTokens.createAccessToken(user.id);

  winston.info("User logged in successfully:", user.id);
  res.status(StatusCodes.OK).json({ user, tokens: { accessToken: myToken } });
});

AuthRouter.post("/signup", async (req, res) => {
  const { email, password, name, profileImgUrl } = req.body;
  if (!email || !password || !name || !profileImgUrl) {
    winston.error("Invalid request: Missing required fields");
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  const user = await UserModel.create({ email, password, name });
  const myToken = AccessTokens.createAccessToken(user.id);

  winston.info("New user signed up successfully:", user.id);
  res.status(StatusCodes.OK).json({ user, tokens: { accessToken: myToken } });
});

module.exports = { AuthRouter };
