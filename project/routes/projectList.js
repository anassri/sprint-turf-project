const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Project, User, Team } = db;
const { asyncHandler } = require('../utils.js');

// Sam - route for fetches to get project data
router.get('/projects-data', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          order: [["createdAt", "ASC"]]
     });
     res.json( projects );
}));

// Sam - route for fetches to get team data
router.get('/team-names/:id(\\d+)', asyncHandler(async (req, res) => {
     const teamName = await Team.findByPk(req.params.id);
     res.json( teamName );
}));

router.get('/projects-data/:value', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: [{ status: req.params.value }]
     });

     res.json( projects );
}));
module.exports = router;