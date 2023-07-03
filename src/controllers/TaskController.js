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
exports.deleteTasks = async (req, res, next) => {
     try {
        let query = {_id: req.params.id}

         let deleteResult = await tasksModel.deleteOne(query);
        if(deleteResult.deletedCount === 0) {
            res.status(200).json({status: "Failed", msg: "Task Not Found"});
        } else {
            res.status(200).json({status: "Succed", msg: "Task Deleted"});
        }
     } catch (err) {
            res.status(200).json({ status: "failed", msg: "Task Deletion" +
                    " failed, Internal server error", errorMsg: err })
     }
}

// Update Task -
exports.updateTask = async (req, res, next)  => {
    let reqbody = req.body;

    try {
        let result = await tasksModel.findByIdAndUpdate( req.params.id, reqbody, {new: true});
        if(result === null) {
            res.status(200).json({status: "Failed", msg: "Invalid id, Task" +
                    " Dont found"});
        } else  {
            res.status(200).json({status: "success", msg:"Task Update" +
                    " succeed", data: result})
        }
    } catch (err) {
        res.status(200).json({status: "failed", msg: "task update failed," +
                " Internal server problem"});
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
