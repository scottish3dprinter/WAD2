const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

function userForm(req, res) {
    res.render('user/add');
}

function addUser(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.error("Failed to add user at hashing", err);
            return res.status(500).send("Error adding user");
        }
        const user = {
            username: req.body.username,
            passwordHash: hash,
            role: req.body.role || 'member'
        };
        userModel.addUser(user, (err) => {
            if (err) {
                console.error("Failed to add user at DB model call", err);
                return res.status(500).send("Error adding user");
            }
            res.redirect('/dashboard');
        });
    });
}

function deleteUser(req, res) {
    userModel.deleteUser(req, res) {
        if (err) {
            console.error("Failed to delete user", err);
            return res.status(500).send("Error dElete user");
        }
        res.redirect('/dashboard');
    });
}

module.exports = {
    userForm,
    addUser,
    deleteUser
}
