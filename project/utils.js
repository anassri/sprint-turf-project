const { validationResult } = require('express-validator');

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

module.exporst = {
    handleValidationErrors,
    asyncHandler
}