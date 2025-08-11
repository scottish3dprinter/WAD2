const eventsModel = require('../models/familyOrganiserModel');

function homepage(req, res) {
    eventsModel.getAllEvents((err, events) => {
        if (err) {
            console.error("Failed to get events", err);
            return res.status(500).send("Failed to load homepage");
        }
        res.render('index', { events: events });
    });
}

function dashboard(req, res) {
    eventsModel.getAllEvents((err, events) => {
        if (err){
            console.error("Failed to get events", err);
            return res.status(500).send("Failed to load dashboard")
        }
      res.render('dashboard', {events: events });
    });
}

function adminPage(req, res) {
    res.render('admin');
}

module.exports = {
    homepage,
    dashboard,
    adminPage
};
