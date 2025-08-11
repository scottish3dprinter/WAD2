const nedb = require('gray-nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const path = require('path');

const dbPath = path.join(__dirname, '../data/users.db');

class User {
	constructor(dbFilePath) {
		if (dbFilePath) {
			this.db = new nedb({ filename: dbFilePath, autoload: true});
			console.log('DB connected to ' + dbFilePath);
		} else {
			this.db = new nedb();
			console.log('non persistent database started');
		}

		this.db.count({}, async (err, count) => {
			if (err) {
				console.error('DB count failed:', err);
			} else if (count === 0) {
                try {
	                const hash = await bcrypt.hash('admin', saltRounds);
                    this.db.insert({
				        user: 'admin',
					    password: hash,
                        level: 0
                    });
                } catch(err) {
                    console.error('Failed to hash admin password:', err);
                }
			console.log('admin user inserted');
			}
		});

	}

	async create(username, password, levelI) {
        username = String(username).trim();
        const existing = await this.lookup(username);
        if (existing) {
            throw new Error('Username already exists');
        }
        const hash = await bcrypt.hash(password, saltRounds);
        return await new Promise((resolve, reject) => {
            this.db.insert({ user: username, password: hash, level: levelI }, (err, doc) => {
                if (err) return reject(err);
                resolve(doc);
            });
        });
    }


    lookup(user) {
    return new Promise((resolve, reject) => {
        this.db.find({ user }, (err, entries) => {
        if (err) return reject(err);
        if (!entries.length) return resolve(null);
        resolve(entries[0]);
        });
    });
    }


    list() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, users) => {
                if (err) return reject(err);
                resolve(users);
            });
        });
    }

    delete(user) {
    return new Promise((resolve, reject) => {
        this.db.remove({ user }, {}, (err, numRemoved) => {
        if (err) return reject(err);
        resolve(numRemoved); // number of documents removed
        });
    });
    }


}
user = new User(dbPath);
module.exports = user;
