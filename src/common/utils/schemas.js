'use strict';

// import libs
const Joi = require('joi');

const onlyLettersRequired           = Joi.string().regex(/^[a-zA-Z]+$/);
const onlyLettersAndNumbersRequired = Joi.string().regex(/^[0-9a-zA-Z]+$/);

const loginSchema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(7).required() 
});

const signupSchema = Joi.object({
    firstName: onlyLettersRequired.required(),
    lastName: onlyLettersRequired.required(),
    username: onlyLettersAndNumbersRequired.min(5).required(),
    password: Joi.string().min(7).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});


module.exports = {
    '/api/v1/account/login': loginSchema,
    '/api/v1/account/signup': signupSchema
};