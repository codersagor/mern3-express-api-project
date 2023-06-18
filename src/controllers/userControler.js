const userModel = require('../models/userModel');

exports.registration = async (req, res, next) => {
    let reqBody  = req.body;

    try {
      let data = await userModel.create(reqBody);
        res.status(200).json({status: "Registrations succeed", data: data});
    } catch (err) {
        res.status(200).json({msg: "Created  failed", data: err})
    }

}