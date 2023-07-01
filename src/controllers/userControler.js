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
    try {
        let { email } = req.headers;
        let OtpCode = Math.floor(Math.random() * 900000) + 100000;

        let results = await OTPmodel.create({ otpcode: OtpCode, email: email }); // Database Insert
        console.log(OtpCode)
        res.status(200).json({ status: "success", msg: results });
        SendEmailUtility(email, `your otp code is: ${OtpCode}`, "Email Verify")
    } catch (err) {
        res.status(200).json({ msg: "Otp create Failed" });
    }
};

// Verify Otp
exports.verifyOtp = async (req, res, next) => {
    try {
        const { email, otpcode } = req.params;

        // Input validation (example: check if email and otpcode are present)
        if (!email || !otpcode) {
            return res.status(400).json({ status: "failed", msg: "Invalid input" });
        }

        const existingOtp = await OTPmodel.findOne({ email, otpcode });

        if (existingOtp) {
            if (existingOtp.status === 0) {
                await OTPmodel.findOneAndUpdate({ email, otpcode }, { status: 1 });
                return res.status(200).json({ status: "Success", msg: "OTP Verified" });
            } else {
                return res.status(200).json({ status: "failed", msg: "OTP already used" });
            }
        } else {
            return res.status(200).json({ status: "failed", msg: "Wrong OTP" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "failed", msg: "Internal server error" });
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