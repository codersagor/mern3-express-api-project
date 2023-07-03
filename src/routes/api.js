const express = require('express');
const {home} = require('../controllers/file');
const { registration, login,profileDetails, sendOtp, verifyOtp} = require('../controllers/userControler');
const { newTask, taskbyid, getAllTask, updateTask, deleteTasks} = require('../controllers/TaskController');
const authVerifyMiddleware = require('../middlewares/AuthVeriyMiddleware')
const router = express.Router();

router.get('/', home);
router.get('/home', home);
router.post('/registration', registration);
router.post('/login', login);
router.get("/sendotp", sendOtp);
router.get("/verifyotp/:email/:otpcode", verifyOtp);

// After Login routes
router.get('/user', authVerifyMiddleware, profileDetails);

// Create new Task
router.post('/newtask', authVerifyMiddleware, newTask)
// Update Task
router.post('/updatetask/:id', authVerifyMiddleware, updateTask);
// Delete Task
router.delete('/deletetask/:id', authVerifyMiddleware, deleteTasks);
// Update Task
router.patch('/updatetask/:id', authVerifyMiddleware, updateTask)

// Get task list by status
router.get('/taskbyid/:status', taskbyid)
router.get('/getalltask',authVerifyMiddleware, getAllTask)

module.exports = router;