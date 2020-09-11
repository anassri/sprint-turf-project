const express = require('express');
const db = require('../db/models');
const { Project, User, Team, Note } = db;
const { asyncHandler, handleValidationErrors } = require('../utils.js');
const { handleCreateValidationErrors, validateCreation } = require('../create-form-utils.js');
const { requireAuth } = require('../auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const validateNote = [
     check("note")
          .exists({ checkFalsy: true })
          .withMessage("Note can't be empty."),
     handleValidationErrors,
];
// Sam - route for fetches to get project data
router.get('/projects-data', requireAuth, asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          order: [["createdAt", "ASC"]]
     });
     res.json( projects );
}));

// Sam - route for fetches to get team data
router.get('/team-names/:id(\\d+)', asyncHandler(async (req, res) => {
     const teamName = await Team.findByPk(req.params.id);
     res.json(teamName);
}));

//Ammar - fetching notes
router.get('/projects/:id/notes', asyncHandler(async (req, res) => {
     const notes = await Note.findAll({
          where: { projectId: req.params.id },
          include: [{
               model: User,
               attributes: ["firstName", "lastName"]
          }],
          order: [["createdAt", "DESC"]]
     });
     console.log({ notes });
     res.json(notes);
}));

//Ammar - creating a  note
router.post('/projects/:id/notes', validateNote, handleValidationErrors, asyncHandler(async (req, res, next) => {
     const { note, projectId, userId } = req.body;
     const userIdInt = Number(userId);
     const newNote = await Note.create({ note, userId: userIdInt, projectId });
     res.json({ newNote });

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

//Ammar - sorting by name
//Ammar - sorting by name
//Ammar - sorting by name
router.get('/projects/name/:value', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where:{
               status: req.params.value
          },
          order: [["projectName", "ASC"]]
     });
     res.json(projects);
}));
router.get('/projects/priority/:value', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: {
               status: req.params.value
          },
          order: [["priority", "ASC"]]
     });
     res.json(projects);
}));
router.get('/projects/deadline/:value', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: {
               status: req.params.value
          },
          order: [["deadline", "ASC"]]
     });
     res.json(projects);
}));
//Ammar - sorting by team
router.get('/projects/team/:value', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: {
               status: req.params.value
          },
          order: [["teamId", "ASC"]]
     });
     res.json(projects);
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

          if (teamId === '0') {
               const newProj = await Project.create({
                    projectName,
                    deadline,
                    description,
                    status,
                    createdAt,
                    updatedAt
               })
          } else {
               const newProj = await Project.create({
                    projectName,
                    deadline,
                    description,
                    teamId,
                    status,
                    createdAt,
                    updatedAt
               })
          }
          const projects = await Project.findAll({
               order: [["createdAt", "ASC"]]
          });
          res.json(projects);
}));
module.exports = router;