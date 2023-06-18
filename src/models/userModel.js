const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema(
    {
        email: {type: String, unique: true},
        title: String,
        description: String,
        status: String,

    }
    , {
        timestamps: true,
        versionKey: false
    });

const UsersModel = mongoose.model('tasks', UsersSchema);

module.exports = UsersModel;