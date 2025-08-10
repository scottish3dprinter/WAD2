const bcrypt = require('bcrypt');
const UsersModel = require('../models/userModel');
const usersModel = new UsersModel();

function loginPage(req, res) {
    res.render('login');
}

function login(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    usersModel.lookup(username, function (err, user) {
        if (err) {
            console.log("error looking up user", err);
            return res.status(401).send();
        }
        if (!user) {
            console.log("user ", username, " not found");
            return res.render("register");
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                req.session.user = {
                    username: user.user,
                     id: user._id,
                     role: user.level
                };
             next();
             } else {
                return res.render("login");
             }
        });
    });
};

function registerPage(req, res) {
    res.render('register');
}

function register(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        return res.status(400).send();
    }
    usersModel.create(username, password, 2);
}

module.exports = {
    loginPage,
    login,
    registerPage,
    register
}
