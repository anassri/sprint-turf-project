const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Project, User } = db;
const { asyncHandler } = require('../utils.js');

router.get('/projects-data', asyncHandler(async (req, res) => {
     const projects = await Project.findAll({
          order: [["createdAt", "ASC"]]
     });
     res.json( projects );
}));

module.exports = router;