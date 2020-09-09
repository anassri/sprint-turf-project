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
router.get('/team-names', asyncHandler(async (req, res) => {
     const teamNames = await Team.findAll();
     res.json( teamNames );
}));

module.exports = router;