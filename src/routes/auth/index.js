// Konstante werden festgesetzt //
const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");
const AccessTokens = require("../../services/auth/AccessToken");

const AuthRouter = Router();

// POST REQUESTS
// Hier das Login basierend auf email/password
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  const user = await UserModel.findOne({ where: { email } });

  // Token wird erstellt und zurückgegeben
  if (user.password !== password) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }

  const myToken = AccessTokens.createAccessToken(user.id);

  res.status(StatusCodes.OK).json({ user, tokens: { accessToken: myToken } });
});
// Hier das Signup basierend auf email, password, name, profileImgUrl
AuthRouter.post("/signup", async (req, res) => {
  const { email, password, name, profileImgUrl } = req.body;
  if (!email || !password || !name || !profileImgUrl) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  // Token wird erstellt und zurückgegeben
  const user = await UserModel.create({ email, password, name });
  const myToken = AccessTokens.createAccessToken(user.id);
  res.status(StatusCodes.OK).json({ user, tokens: { accessToken: myToken } });
});

module.exports = { AuthRouter };
