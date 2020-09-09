const express = require("express");
const router = express.Router();
const path = require('path');
const { csrfProtection } = require('../utils');

router.use(express.static(path.join(__dirname, 'public')));

router.get("/", (req, res) => {
    res.send("Home page");
});

router.get('/projects', (req, res) => {
    res.render('projects-list');
});

router.get('/users/sign-up', csrfProtection, (req, res)=>{
    if(req.user){
        res.redirect("/");
        return;
    }
    res.render('sign-up', { csrf: req.csrfToken() });
})

module.exports = router;