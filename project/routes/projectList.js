const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Project, User } = db;
const { asyncHandler } = require('../utils.js');


// router.get('/projects', asyncHandler(async (req, res) => {
//      // const projects = await Project.findAll({
//      //      order: [["deadline", "ASC"]]
//      // });
//      const projects = { projectName: 'Testing' };
//      console.log(projects)
//      res.render('projects-list');
// }));

router.get('/projects-data', asyncHandler(async (req, res) => {
     const projects = [{ projectName: 'Testing' }, { projectName: "Testing2"}];
     res.json( projects );
}));

module.exports = router;