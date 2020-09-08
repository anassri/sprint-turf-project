const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Project, User } = db;

router.set('view engine', 'pug');

router.get('/projects', async (req, res) => {
     const projects = await Project.findAll({
          order: [["deadline", "ASC"]]
     });
     res.json(projects);
     res.render('projects-list');
});