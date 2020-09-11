const express = require("express");
const router = express.Router();
const path = require('path');
const { csrfProtection } = require('../utils');

router.get('/', (req, res) => {
    res.render('projects-list');
});

router.get("/users/login", (req, res) => {
    res.render('log-in');
});

router.get('/users/sign-up', csrfProtection, (req, res)=>{
    if(req.user){
        res.redirect("/");
        return;
    }
    res.render('sign-up', { csrf: req.csrfToken() });
})

module.exports = router;
