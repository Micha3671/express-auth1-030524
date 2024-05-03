const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function createAccessToken(userId) {
  // Access Token mit dem Inhalt der User Id erstellen
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
  console.log("This is my access Token", accessToken);

  return accessToken;
}

function decodeAccessToken(accessToken) {
  // Den Inhalt des Access tokens dekodieren
  const decodedToken = jwt.verify(accessToken, JWT_SECRET);

  console.log("this is my decoded Token", decodedToken);

  return decodedToken;
}

module.exports = { createAccessToken, decodeAccessToken };
