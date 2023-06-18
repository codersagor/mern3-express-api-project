const mongoose = require('mongoose');

const OTPschema = mongoose.Schema(
    {
        email: String,
        otp: { type: String },
        status: { type: Number, default: 0 },
    }
, {
    timestamps: true,
    versionKey: false
});

const OTPmodel = mongoose.model('otps', OTPschema);

module.exports = OTPmodel;