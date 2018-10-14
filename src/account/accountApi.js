'use strict';

// import libs
const express = require('express');

//import modules
const AccountService = require("../account/accountService");
const catchException = require("../common/middleware/catchException");

const init = (app) => {
    const router         = express.Router();
    const accountService = new AccountService();

    app.post(
        '/api/v1/account/signup',
        catchException(async (req, res) => {
            const user = req.body;
            const savedUser = await accountService.signUp(user);
            res.send(savedUser);
        })
    );

    app.post(
        '/api/v1/account/login', async (req, res) => {
            try {
                const { username, password } = req.body;
                const user = await accountService.logIn(username, password);
                res.send(user);
            }
            catch(error) {
                res.send(error);
            }
        }
    );

    app.use('/api/v1/account/signup', router);
    app.use('/api/v1/account/login', router);
};

module.exports = {
    init: init
};
catchException(async (req, res) => {
    const { username, password } = req.body;
    const user = await accountService.logIn(username, password);
    res.send(user);
})

