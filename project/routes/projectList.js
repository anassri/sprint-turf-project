const express = require('express');
const db = require('../db/models');
const { Project, User, Team, Note } = db;
const { asyncHandler, handleValidationErrors } = require('../utils.js');
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
router.get('/projects-data', asyncHandler(async (req, res) => {
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

router.get('/projects/:id/notes', requireAuth, asyncHandler(async (req, res) => {
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

router.post('/projects/:id/notes', validateNote, handleValidationErrors, asyncHandler(async (req, res, next) => {
     const { note, projectId, userId } = req.body;
     const userIdInt = Number(userId);
     const newNote = await Note.create({ note, userId: userIdInt, projectId });
     res.json({ newNote });
   
}));

router.get('/projects-data/:value', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: [{ status: req.params.value }]
     });

     res.json( projects );
}));

router.get('/projects/name', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where:{
               status: false
          },
          order: [["projectName", "ASC"]]
     });
     res.json(projects);
}));
router.get('/projects/priority', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: {
               status: false
          },
          order: [["priority", "ASC"]]
     });
     res.json(projects);
}));
router.get('/projects/deadline', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: {
               status: false
          },
          order: [["deadline", "ASC"]]
     });
     res.json(projects);
}));
router.get('/projects/team', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          where: {
               status: false
          },
          order: [["teamId", "ASC"]]
     });
     res.json(projects);
}));

module.exports = router;