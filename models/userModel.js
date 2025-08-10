const nedb = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
    create(username, password, levelI) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var entry = {
                user: username,
                password: hash,
                level: levelI // 0 = admin, 1 = Organisers, 2 = User
            };
            that.db.insert(entry, function (err) {
            if (err) {
            console.log("Can't insert user: ", username);
            }
            });
        });
    }

    lookup(user, cb) {
        this.db.find({'user': user}, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }

    list(cb) {
        this.db.find({}, cb);
    }

    delete(user, cb) {
        this.db.remove({ user: user }, {}, cb;
    }

}

module.exports = User;
