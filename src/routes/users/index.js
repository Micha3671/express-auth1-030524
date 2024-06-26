const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");

const UserRouter = Router();

// GET REQUESTS
//  Der Nutzer wird hier basierend auf der userId aus dem Token ermittelt
UserRouter.get("/currentuser", async (req, res) => {
  const userId = req.user.userId;

  console.log("userId", userId);

  const user = await UserModel.findOne({ where: { id: userId } });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    return;
  }

  res.status(StatusCodes.OK).json({ user });
});

module.exports = { UserRouter };
