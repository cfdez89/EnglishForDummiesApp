'use strict';

// import libs
const express = require('express');

//import modules
const TeamService    = require("../team/teamService");
const catchException = require("../common/middleware/catchException");

module.exports.init = (app) => {
    const router  = express.Router();
    const teamService = new TeamService();
    
    app.get(
        '/api/v1/team/:id',
        catchException(async (req, res) => {
            const { id } = req.params;
        })
    );

    app.get(
        '/api/v1/teams/',
        catchException(async (req, res) => {

        })
    );

    app.post(
        '/api/v1/team/',
        catchException(async (req, res) => {
            const { name } = req.body;
        })
    );

    app.use('/api/v1/team/:id', router);
    app.use('/api/v1/teams/', router);
    app.use('/api/v1/team/', router);

};