'use strict';

// import libs
const express = require('express');
const path    = require('path');

//import modules
const AccountService  = require('../account/accountService');
const validator       = require('../common/middleware/schemaValidator'); 
const catchException  = require('../common/middleware/catchException');

const init = (app) => {
    const router          = express.Router();
    const accountService  = new AccountService();
    const validateRequest = validator.schemaValidator(true);

    app.get(
        '/login', 
        (req, res) => {
            res.sendFile(path.resolve(__dirname, "../../", "public", "login.html"));
        }
    );

    app.post(
        '/api/v1/account/login', 
        validateRequest,
        async (req, res) => {
            try {
                const { username, password } = req.body;
                const user = await accountService.logIn(username, password);
                res.status(200).send(user);
                res.end();
               // res.redirect("/");
            }
            catch(error) {
                //res.send(error);
            }
        }
    );

    app.post(
        '/api/v1/account/signup',
        validateRequest,
        catchException(async (req, res) => {
            const user = req.body;
            const savedUser = await accountService.signUp(user);
            res.send(savedUser);
        })
    );

    
    app.use('/login', router);
    app.use('/api/v1/account/login', router);
    app.use('/api/v1/account/signup', router);
};

module.exports = {
    init: init
};



