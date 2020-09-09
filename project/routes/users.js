const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { User, Team, Project } = require('../db/models');
const { getUserToken, requireAuth } = require('../auth');

const router = express.Router();

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);



const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
];

router.get("/login", asyncHandler(async (req, res) => {
    res.render('log-in');
  })
);


// logging in
router.post(
  "/token",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid"];
      return next(err);
    }

    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })

);

module.exports = router;
