const express = require('express');
const router = express.Router();

const familyOrganiserController = require('../controllers/familyOrganiserController');
const eventController = require('../controllers/eventController');
const auth = require('../auth/auth');
//Homepage
router.get('/', familyOrganiserController.homepage);

//Login
router.get('/login', auth.loginPage);
router.post('/login', auth.login);

//Register
router.get('/register', auth.registerPage);
router.post('/register', auth.register);

//Dashboard
router.get('/dashboard', familyOrganiserController.dashboard);

//Events
router.get('/event/add', eventController.addForm);
router.post('/event/add', eventController.addEvent);
router.post('/event/delete/:id', eventController.deleteEvent);

//404
router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;
