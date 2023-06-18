const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema(
    {
        email: {type: String, unique: true},
        firstName: String,
        lastName: String,
        mobile: String,
        password: String
    }
    , {
        timestamps: true,
        versionKey: false
    });

const UsersModel = mongoose.model('tasks', UsersSchema);

module.exports = UsersModel;