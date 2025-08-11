const userModel = require('../models/userModel');

//const dbPath = path.join(__dirname, '../data/users.db');
//const userModel = new UserModel(dbPath);

function userForm(req, res) {
    res.render('admin/add');
}

async function addUser(req, res) {
    let level = 2;
    if (req.body.role) {
        if (req.body.role === "organiser") {
            level = 1;
        } else if (req.body.role === "admin") {
            level = 0;
        }
    }

    try {
        await userModel.create(req.body.username, req.body.password, level);
        res.redirect('/dashboard');
    } catch (err) {
        console.error("Failed to create user", err)
        res.status(400).send(err.message);
    }
}

async function deleteUser(req, res) {
    const username = req.params.username;
    try{
        await userModel.delete(username);
        res.redirect('/dashboard');
    } catch (err) {
        console.error("Failed to delete user", err);
        res.status(500).send("Error deleting user");
    }

}

async function adminDashboard(req, res) {
    try {
        const users = await userModel.list();

        const Ausers = users.filter(u => u.level === 0).map(u => ({ user: u.user || 'Unknown' }));

        const Ousers = users.filter(u => u.level === 1).map(u => ({ user: u.user || 'Unknown' }));

        const Busers = users.filter(u => u.level === 2).map(u => ({ user: u.user || 'Unknown' }));

        res.render('admin/admin', { Ousers, Ausers, Busers });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send();
    }
}


module.exports = {
    userForm,
    addUser,
    deleteUser,
    adminDashboard
}
