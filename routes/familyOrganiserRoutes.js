const express = require('express');
const router = express.Router();

const familyOrganiserController = require('../controllers/familyOrganiserController');
const eventController = require('../controllers/eventController');
const userController = require('../controllers/usersController');
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
router.get('/event/add', auth.isOrganiser, eventController.addForm);
router.post('/event/add', auth.isOrganiser, eventController.addEvent);
router.get('/event/:id', eventController.eventDetails);
router.post('/event/delete/:id', auth.isOrganiser, eventController.deleteEvent);

//Admin
router.get('/admin', auth.isAdmin, userController.adminDashboard);
router.get('/admin/addUser', auth.isAdmin, userController.userForm);
router.post('/admin/addUser', auth.isAdmin, userController.addUser);

//404
router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;
