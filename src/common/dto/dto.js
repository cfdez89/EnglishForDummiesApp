'use strict';

var responseStatus = require('../constants/responseStatus'); 

var responseGeneric = (req, res, body) => {
    let response;
    if (body instanceof Error) {
        response = formatError(res, body.data);
    } 
    else {
        response = formatSuccess(res, body.data);
    }
      
    res.header('Content-Length', Buffer.byteLength(response));
    res.header('Content-Type', 'application/json');
    
    const formatSuccess = (res, data) => {
        return {
            status: responseStatus.SUCCESS, 
            message: '',
            data: data
        };
    };

    const formatError = (message) => {
        return {
            status: responseStatus.FAILED, 
            message: message,
            data: null
        };
    };

    return response;
}
  module.exports = {
      responseGeneric: responseGeneric
  };