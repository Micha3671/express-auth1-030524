const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

// Access Token wird mit dem Inhalt der User Id erstellt
function createAccessToken(userId) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
  console.log("This is my access Token", accessToken);

  return accessToken;
}
// Den Inhalt des Access tokens wird dekodiert
function decodeAccessToken(accessToken) {
  const decodedToken = jwt.verify(accessToken, JWT_SECRET);

  console.log("this is my decoded Token", decodedToken);

  return decodedToken;
}

module.exports = { createAccessToken, decodeAccessToken };
