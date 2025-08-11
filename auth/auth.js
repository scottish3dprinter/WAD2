const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, '../data/users.db');

const UsersModel = require('../models/userModel');
const usersModel = new UsersModel(dbPath);

function loginPage(req, res) {
    res.render('login');
}

async function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    try {

        const user = await usersModel.lookup(username);
        if (!user) {
            console.log("user ", username, " not found");
            return res.status(401).redirect('/login');
        }
        const result = await bcrypt.compare(password, user.password)
        if (result) {
            req.session.user = {
                username: user.user,
                id: user._id,
                role: user.level
            };
            return res.redirect('/dashboard')
        } else {
            return res.redirect('/login')
        }

    } catch (err) {
        console.log("error looking up user", err);
        return res.status(401).send();
    }
}


function registerPage(req, res) {
    res.render('register');
}

async function register(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        return res.status(400).send();
    }

    try {
        const existingUser = await usersModel.lookup(username);
        if (existingUser) {
            console.error("User already exists", username);
            return res.status(409).send();
        }

        await usersModel.create(username, password, 2);
        res.redirect('/login')
    } catch (err) {
        console.error("Error looking up user", err);
        return res.status(500).send();
    }
}
module.exports = {
    loginPage,
    login,
    registerPage,
    register
};
