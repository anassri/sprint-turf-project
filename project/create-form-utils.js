const { User, Team, Project } = require('./db/models');
const { check, validationResult } = require('express-validator');
// Sam - validators for the project creation form
const handleCreateValidationErrors = (req,res,next) =>{

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((err) => err.msg);
        const err = Error("Bad Request");
        err.errors = errors;
        console.log(err.errors);
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
    }
    next();
}

const validateCreation = [
     check('projectName')
          .exists({ checkFalsy: true })
          .withMessage("Please enter a project name")
          .isLength({ min: 5, max: 20 })
          .withMessage('Please enter a name between 5 and 20 characters'),
     check('deadline')
          .exists({ checkFalsy: true })
          .withMessage("Please select a valid date")
          .isDate({ checkFalsy: true })
          .withMessage('Please enter a value that is a date'),
     check('description')
          .exists({ checkFalsy: true })
          .isLength({ min: 10 })
          .withMessage("Please enter a description"),
     handleCreateValidationErrors
];

module.exports = {
     handleCreateValidationErrors,
     validateCreation
}
