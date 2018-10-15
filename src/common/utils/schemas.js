'use strict';

// import libs
const Joi = require('joi');

const onlyLettersRequired = Joi.string().regex(/^[A-Z]+$/);

const loginSchema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(7).required() 
});

const signupSchema = Joi.object({
    firstName: onlyLettersRequired.required(),
    lastName: onlyLettersRequired.required(),
    username: onlyLettersRequired.min(5).required(),
    password: Joi.string().min(7).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});


module.exports = {
    '/api/v1/account/login': loginSchema,
    '/api/v1/account/signup': signupSchema
};