'use strict';

// import libs
const Joi = require('joi');

//import modules
const checkObjectsType = require('../utils/checkObjectsType');
const schemas          = require('../utils/schemas');

var getErrors = (detailErrors) => {
    var errors = detailErrors.map((detailError) => {
        var message = detailError.message; 
        var index   = message.indexOf(':');
        return message.substring(0, index);
    }); 
    return errors;
};

var isValidSchema = (data, schema, validationOptions, hasSendJoiError) => {
    var result = Joi.validate(data, schema, validationOptions);
    if(result.error === null) {
        return {
            isValid: true,
            data: data
        };
    } //hasSendJoiError ? JoiError : CustomError
    return {
        isValid: false,
        data: getErrors(result.error.details)
    };
}


var schemaValidator = (useJoiError = false) => {
    const hasSendJoiError   = checkObjectsType.isBoolean(useJoiError) && useJoiError;
    const supportedMethods  = ['post', 'put'];
    const validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };

    return (req, res, next) => {
        const route  = req.route.path;
        const method = req.method.toLowerCase();
        const data   = Object.assign({}, req.body);

        var hasMethod = supportedMethods.includes(method);
        var hasProp   = schemas.hasOwnProperty(route); 

        if(hasMethod && hasProp) {
            var currentSchema = schemas[route];
            if(currentSchema) {
                var validatedSchema = isValidSchema(data, currentSchema, validationOptions, hasSendJoiError);
               console.log(validatedSchema);
                if(validatedSchema.isValid) {
                    req.body = validatedSchema.data;
                    return next();
                }
                else {
                    return res.status(422).send(validatedSchema.data);
                }
            } 
        }
        return next();
    };
};

module.exports = {
    schemaValidator: schemaValidator
};