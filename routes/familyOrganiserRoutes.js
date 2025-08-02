const express = require('express');
const router = express.Router();

//Homepage
router.get('/', (req, res) => {
    res.render('index');
});

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

//Dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

//404
router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;
