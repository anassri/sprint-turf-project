const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { User, Team, Project } = require('../db/models');
const { getUserToken, requireAuth } = require('../auth');

const router = express.Router();

const validateUsername =
    check("username")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a username");

const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
];


router.post('/', validateUsername, validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({
        user: { id: user.id },
        token,
    });
}));

router.post('/token', validateEmailAndPassword, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email }
    })

    if (!user || !user.validatePassword(password)) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid'];
        return next(err);
    }

    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
})
)

router.get('/:id(\\d+)/tweets', requireAuth, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const tweets = await Tweet.findAll({ where: { userId: id } });
    res.json({ tweets });
}))

module.exports = router;