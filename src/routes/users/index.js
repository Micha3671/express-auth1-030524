const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");
const winston = require("../logger"); // Importiere Winston

const UserRouter = Router();

// GET REQUESTS
UserRouter.get("/currentuser", async (req, res) => {
  const userId = req.user.userId;

  winston.info("Fetching user information for user ID:", userId);

  const user = await UserModel.findOne({ where: { id: userId } });

  if (!user) {
    winston.error("User not found for ID:", userId);
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    return;
  }

  winston.info("User information retrieved successfully for ID:", userId);
  res.status(StatusCodes.OK).json({ user });
});

module.exports = { UserRouter };
