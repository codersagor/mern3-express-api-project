const tasksModel = require('../models/taskModel');

// Create New Task
exports.newTask = async (req, res, next) => {
    let task = req.body;
    try {
        let results = await tasksModel.create(task);
        res.status(200).json({status: "Success", msg: "Task Created", data: task})
    } catch (err) {
        res.status(200).json({status: "Failed", msg: "Task creation failed", error: err})
    }
}

// Delete task -
exports.deleteTasks = async (req, res, next)  => {
    let { id } = req.params;
    let query = {_id: id};

    try {
        let results = await tasksModel.deleteOne(query);
        res.status(204).json({status: "succeed", msg: "Task Deleted"})
    } catch (err) {
        res.status(200).json({status: "failed", msg: "Task Delete failed"})
    }
}

// Update Task -
exports.updateTask = async (req, res, next)  => {
    let reqbody = req.body;
    let {id} = req.params;
    let query = {_id: id};

    try {
        let result = await tasksModel.updateOne(query, reqbody);
        res.status(200).json({status: "succeed", msg: "Data succeed done"});
    } catch (err) {
        res.status(200).json({status: "failed", msg: "Data delete fail"});
    }
}

// Get task list by status
exports.taskbyid = async (req, res, next) => {
    let status = req.params.status;
    try {
        let task = await tasksModel.find({ status });
        res.status(200).json(task);
    } catch (err) {
        res.status(200).json({
            msg: "internal server error"
        })
    }
}

// Get all Task
exports.getAllTask = async (req, res, next) => {
   try {
       let task = await tasksModel.find({});
       res.status(200).json(task);
   } catch (err) {
       res.status(200).json({
           msg: "internal server error"
       })
   }
}

