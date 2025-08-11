const eventsModel = require('../models/familyOrganiserModel');
const userModel = require('../models/userModel');

function addForm(req, res) {
    res.render('event/add');
}

async function addEvent(req, res) {
    try {
    const user = await userModel.lookup(req.body.userId);
    const newEvent = {
        name: req.body.title,
        user: user ? user.user : req.body.userId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
        equipment: req.body.equipment,
        userId: req.body.userId,
        recurring: req.body.recurring === 'on'
    };
    eventsModel.addEvent(newEvent, (err)=> {
        if (err) {
            console.error("Failed to add event", err);
            return res.status(500).send("Error adding event");
        }
        res.redirect('/dashboard');
    });
    } catch (err) {
        console.error("Failed to look up user", err);
        res.status(500).send("Error adding event");
    }
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

function eventDetails(req, res) {
    eventsModel.getEventById(req.params.id, (err, event) => {
        if (err || !event) {
            console.error("Failed to get event", err, " Id:", req.params.id);
            return res.status(404).send("Event not found");
        }
        res.render('event/detail', { event: event });
    });
}

module.exports = {
    addForm,
    addEvent,
    deleteEvent,
    eventDetails
};
