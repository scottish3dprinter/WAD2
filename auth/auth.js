const bcrypt = require('bcrypt');

const usersModel = require('../models/userModel');
//const usersModel = new UsersModel(dbPath);

function loginPage(req, res) {
    const error = req.session.error;
    delete req.session.error;
    res.render('login', {error});
}

async function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    try {

        const user = await usersModel.lookup(username);
        if (!user) {
            console.log("user ", username, " not found");
            req.session.error = "No user";
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
            req.session.error = "Incorrect password"
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

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    return res.redirect('/login')
}

function isOrganiser(req, res, next) {
    if (req.session && req.session.user.role <= 1) {
        return next();
    }
    return res.redirect('/login')
}

function isAdmin(req, res, next) {
    if (req.session && req.session.user.role === 0) {
        return next();
    }
    return res.redirect('/login')
}

module.exports = {
    loginPage,
    login,
    registerPage,
    register,
    isAuthenticated,
    isOrganiser,
    isAdmin,
};
