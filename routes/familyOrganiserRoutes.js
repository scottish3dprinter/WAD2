const express = require('express');
const router = express.router();

//Homepage
router.get('/', (req, res) => {
    res.render('index');
});

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

//Dashboard
router.get('/dashboard', (req. res) => {
    res.render('dashboard');
});

module.export = router;
