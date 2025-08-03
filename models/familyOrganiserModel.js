const nedb = require('nedb');

class FamilyOrganiser {
	constructor(dbFilePath) {
		if (dbFilePath) {
			this.db = new nedb({ filename: dbFilePath, autoload: true});
			console.log('DB connected to ' + dbFilePath);
		} else {
			this.db = new nedb();
			console.log('non persistent database started');
		}



		this.db.count({}, (err, count) => {
			if (err) {
				console.error('DB count failed:', err);
			} else if (count === 0) {
				this.db.insert({
					name: 'Woodland walk',
					user: 'Arron',
					location: 'Woods',
					startTime: '2025-07-27T22:39:42',
					equipment: ['Walking Boots', 'Sun Cream', 'First Aid Kit'],
					recurring: false
				});
			console.log('Initial data inserted');
			}
		});

	}

	addEvent(event, callback) {
		this.db.insert(event, callback);
	}

	getAllEvents(callback) {
		this.db.find({}, callback);
	}

	getEventsByUser(user, callback) {
		this.db.find({ user: user }, callback);
	}

    getEventById(Id, callback) {
        this.db.findOne({ _id: id }, callback);
    }

	deleteEventById(id, callback) {
		this.db.remove({ _id: id }, {}, callback);
	}

	updateEvent(id, newData, callback) {
		this.db.update({ _id: id }, { $set: newData }, {}, callback);
	}
}

module.exports = FamilyOrganiser;
