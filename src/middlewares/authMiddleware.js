const { StatusCodes } = require("http-status-codes");
const AccessTokens = require("../services/auth/AccessToken");
const winston = require("../logger"); // Importiere Winston

function authMiddleWare(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    winston.error("No Token provided!");
    return res.status(StatusCodes.FORBIDDEN).send("No Token provided!");
  }
  try {
    const decodedAccessToken = AccessTokens.decodeAccessToken(token);
    req.user = decodedAccessToken;
  } catch (e) {
    winston.error("Something is wrong with the token", e);
    return res
      .status(StatusCodes.FORBIDDEN)
      .send("Something is wrong with your token");
  }

  return next();
}

module.exports = authMiddleWare;
