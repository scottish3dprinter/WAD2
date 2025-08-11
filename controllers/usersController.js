const UserModel = require('../models/userModel');
const userModel = new UserModel();

function userForm(req, res) {
    res.render('user/add');
}

function addUser(req, res) {
    let level = 2;
    if (req.body.role) {
        if (req.body.role === "organiser") {
            level = 1;
        } else if (req.body.role === "admin") {
            level = 0;
        }
    }

    userModel.create(req.body.username, req.body.password, level);
    res.redirect('/dashboard');
}

function deleteUser(req, res) {
    const username = req.params.username;
    userModel.delete(username, (err) => {
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
