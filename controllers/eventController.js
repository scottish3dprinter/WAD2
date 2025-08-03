const eventsModel = require('../models/eventsmodel');

function addForm(req, res) {
    res.render(event/add');
}

function addEvent(req, res) {
    const newEvent = {
        title: req.body.title,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
        equipment: req.body.equipment,
        userId: req.body.userId,,
        recurring: req.body.recurring === 'on'
    };

    eventsModel.addEvent(newEvent, (err) => {
        if (err) {
            console.error("Failed to add event", err);
            return res.status(500).send("Error adding event");
        }
        res.redirect('/dashboard');
    });
}

function deleteEvent(req, res) {
    eventsModel.deleteEventById(req.params.id, (err) => {
        if (err) {
            console.error("Failed to delete event", err);
            return res.status(500).send("error deleting event");
        }
        res.redirect('/dashboard');
    });
}

module.exports = {
    addForm,
    addEvent,
    deleteEvent
};
