const userModel = require('../models/userModel');
const OTPmodel = require('../models/OTPmodel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const SendEmailUtility = require("../utility/sendEmailUtility");

exports.registration = async (req, res, next) => {
    try {
        // Encrypt the original Password
        const HashedPassword = await bcrypt.hash(req.body.password, 10);
        let reqBody  = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            password: HashedPassword
        };
        // insert the user in db
      let data = await userModel.create(reqBody);
        res.status(200).json({status: "Registrations succeed", data: data});
    } catch (err) {
        res.status(200).json({msg: "Created  failed", data: err})
    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ status: 'Wrong password' });
        }

        const payload = { email };
        const token = jwt.sign(payload, 'SecretKey123456', { expiresIn: '1h' });
        res.status(200).json({ status: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ msg: 'Login failed', error: error.message });
    }
};

// send otp

exports.sendOtp = async (req, res, next) => {
    let email = req.headers.email;
    let OtpCode = Math.floor(Math.random() * 900000) + 100000;


    try {
        let results = await OTPmodel.create({ otpcode: OtpCode, email: email }); // Database Insert
        console.log(OtpCode)
        res.status(200).json({ status: "success", msg: results });
    } catch (err) {
        res.status(200).json({ msg: "Otp create Failed" });
    }
};



// Get User profile ---- After Login
exports.profileDetails = async  (req, res, next) => {
    let email = req.headers['email'];

    try {
        let results = await userModel.find({email: email});
        res.status(200).json({status: "Success", data: results})
    } catch (err) {
        res.status(200).json({msg: "Internal Server Error"})
    }
}