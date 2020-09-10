const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Project, User, Team } = db;
const { asyncHandler, csrfProtection } = require('../utils.js');
const { handleCreateValidationErrors, validateCreation } = require('../create-form-utils.js');
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

router.get('/team-names', asyncHandler(async (req, res) => {
     const teamNames = await Team.findAll();
     res.json( teamNames );
}));

router.get('/projects-data/:value', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: [{ status: req.params.value }]
     });

     res.json( projects );
}));

router.post('/projects-data',
     handleCreateValidationErrors,
     validateCreation,
     asyncHandler(async (req, res) => {
          const {
               projectName,
               deadline,
               teamId,
               description,
               status,
               createdAt,
               updatedAt
          } = req.body;

          const newProj = await Project.create({
               projectName,
               deadline,
               teamId,
               description,
               status,
               createdAt,
               updatedAt
          })
          const projects = await Project.findAll({
               order: [["createdAt", "ASC"]]
          });
          res.json(projects).redirect('/');
}));
module.exports = router;