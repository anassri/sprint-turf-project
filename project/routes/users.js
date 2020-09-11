const express = require('express');
const bcrypt = require('bcryptjs');

const { asyncHandler, handleValidationErrors, userValidators, validateEmailAndPassword, validateUsername, csrfProtection } = require('../utils');
const { User, Team, Project } = require('../db/models');
const { getUserToken, requireAuth } = require('../auth');
const router = express.Router();


// Ammar - Sign-up route
router.post(
  "/", 
  userValidators, 
  handleValidationErrors, 
  asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const user = await User.create({ firstName, lastName, email, hashedPassword });
        
    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
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

// Log Out
router.delete('/session', asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'success' });
}));


module.exports = router;
