const eventsModel = require('../model/eventsModel');

function homepage(req, res) {
    eventsModel.getAllEvents((err, events) => {
        if (err) {
            console.error("Failed to get events", err);
            return res.status(500).send("Failed to load homepage");
        }
        res.render('index', { events: events });
    });
}

function eventDetails(req, res) {
    eventsModel.getEventById(req.params.id, (err, event) => {
        if (err || !event) {
            console.error("Failed to get event", err, " Id:", req.params.id);
            return res.status(404).send("Event not found");
        }
        res.render('events/detail', { event: event });
    });
}

module.exports = {
    homepage,
    eventDetails
};
