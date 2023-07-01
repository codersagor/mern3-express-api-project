const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        email: String,
        title: String,
        description: String,
        status: {
            type: String,
            enum: ['completed', 'canceled', 'inprogress'],
            default: "inprogress"
        }

    }
    , {
        timestamps: true,
        versionKey: false
    });

const tasksModel = mongoose.model('tasks', TaskSchema);

module.exports = tasksModel;