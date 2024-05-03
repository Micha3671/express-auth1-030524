const { Router } = require("express");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./users");
const authMiddleWare = require("../middlewares/authMiddleware");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
// Die Users Router durchläuft die auth Middleware
AppRouter.use("/users", authMiddleWare, UserRouter);

module.exports = { AppRouter };
