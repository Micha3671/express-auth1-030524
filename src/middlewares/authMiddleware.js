// Zuerst werden die Kontanten festgestzt, die wir benötigen //
const { StatusCodes } = require("http-status-codes");
const AccessTokens = require("../services/auth/AccessToken");
// Hier wird die entsprechende Middleware-Funktion geschrieben //
function authMiddleWare(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).send("No Token provided!");
  }
  try {
    const decodedAccessToken = AccessTokens.decodeAccessToken(token);
    req.user = decodedAccessToken;
  } catch (e) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send("Something is wrong with your token");
  }

  return next();
}

module.exports = authMiddleWare;
