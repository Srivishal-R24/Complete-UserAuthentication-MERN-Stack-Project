const express = require("express");

const {
    userRegistration,
    userLogin,
    userPasswordForget,
    userPasswordReset,
    userVerifyEmail,
    userLogout,
} = require("../controllers/controller-user");

const authRouter = express.Router();

authRouter.post(
    "/register",
    userRegistration
);

authRouter.post(
    "/login",
    userLogin
);

authRouter.post(
    "/forget-password",
    userPasswordForget
);

authRouter.post(
    "/reset-password/:token",
    userPasswordReset
);

authRouter.post('/verify-email/:token', userVerifyEmail);
authRouter.post('/logout', userLogout);


module.exports = authRouter;