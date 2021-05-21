const User = require('../models/User');
const { sequelize } = require('../db/sqliteDB');


module.exports = {
     
    getAllUsers: async (req, res) => {
        try {
            await sequelize.sync();
            const users = await User.findAll();
            res.json({ success: true, data: users }).status(200);

        } catch (e) {
            console.log(e);
            res.json({ success: false, message: 'Failed to find users' }).status(500);
        }
    },
    deleteAUser: async (req, res) => {
        try {
            await sequelize.sync();
            const user = await User.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (user.length) {
                res.json({ success: true, message: 'User deleted!' }).status(200);
            } else {
                res.json({ success: false, message: 'Failed to find user' }).status(404);
            }

        } catch (e) {
            console.log(e);
            res.json({ success: false, message: 'Failed to delete user' }).status(500);
        }
    },
    updateAUser: async (req, res) => {
        try {
            await sequelize.sync();
            const user = await User.update({ ...req.body }, {
                where: {
                    id: req.params.id
                }
            });
            if (user.length) {
                res.json({ success: true, message: 'User updated!', data: user }).status(200);
            } else {
                res.json({ success: false, message: 'Failed to find user' }).status(404);
            }

        } catch (e) {
            console.log(e);
            res.json({ success: false, message: 'Failed to update user' }).status(500);
        }
    }
}