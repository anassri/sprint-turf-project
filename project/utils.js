const { User, Team, Project } = require('./db/models');
const { check, validationResult } = require('express-validator');

const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

const handleValidationErrors = (req,res,next) =>{

    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((err) => err.msg);
        const err = Error("Bad Request");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
    }
    next();
}

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

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
    handleValidationErrors,
];

const userValidators = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide a first name')
        .isLength({ max: 20 })
        .withMessage('First Name must not be more than 50 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide a last name')
        .isLength({ max: 20 })
        .withMessage('last Name must not be more than 50 characters'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide an email')
        .isLength({ max: 50 })
        .withMessage('email must not be more than 255 characters')
        .isEmail()
        .withMessage('Email address is not a valid email')
        .custom((value) => {
            return User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('Email already in use')
                    }
                })
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password')
        .isLength({ max: 50 })
        .withMessage('Password must not be longer than 50 characters')/* 
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least one upper case letter, one lower case letter, one number, one character') */,
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a confirm password')
        .isLength({ max: 50 })
        .withMessage('Confirm password must not be longer than 50 characters')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password must match');
            }
            return true;
        }),
    handleValidationErrors,
];

module.exports = {
    handleValidationErrors,
    asyncHandler,
    validateUsername,
    validateEmailAndPassword,
    userValidators,
    csrfProtection
}