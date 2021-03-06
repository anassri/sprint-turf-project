const express = require("express");
const router = express.Router();
const path = require('path');
const { csrfProtection } = require('../utils');
const { requireAuth } = require('../auth');


router.get('/', (req, res) => {
    res.render('projects-list');
});

router.get("/users/login", csrfProtection, (req, res) => {
    res.render('log-in', { csrf: req.csrfToken() });
});

router.get('/users/sign-up', csrfProtection, (req, res)=>{
    if(req.user){
        res.redirect("/");
        return;
    }
    res.render('sign-up', { csrf: req.csrfToken() });
})

module.exports = router;
