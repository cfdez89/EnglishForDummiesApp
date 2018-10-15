'use strict';

// import libs
const Joi = require('joi');

//import modules
const checkObjectsType = require('../utils/checkObjectsType');
const schemas          = require('../utils/schemas');

var isValidSchema = (data, schema, validationOptions, hasSendJoiError) => {
    var result = Joi.validate(data, schema, validationOptions);
    if(result.error === null) {

        //hasSendJoiError ? JoiError : CustomError
        return {
            isValid: true,
            data: data
        };

    }
    console.log(result);
    return {
        isValid: false,
        data: null
    };
}


module.exports = (useJoiError = false) => {
    const hasSendJoiError = checkObjectsType.isBoolean(useJoiError) && useJoiError;
    const supportedMethods = ['post', 'put'];
    const validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };

    return (req, res, next) => {
        const route = req.route.path;
        const method = req.method.toLowerCase();
        
        var hasMethod = supportedMethods.includes(method);
        var hasProp   = schemas.hasOwnProperty(route); 

        if(hasMethod && hasProp) {
            var currentSchema = schemas[route];
            if(currentSchema) {
                var validatedSchema = isValidSchema(req.body, currentSchema, validationOptions, hasSendJoiError);
                if(validatedSchema.isValid) {
                    req.body = validatedSchema.data;
                    next();
                }
                else {
                    res.status(422).send(validatedSchema.data);
                }
            } 
        }
        next();
    };
};