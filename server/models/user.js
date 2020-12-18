let
    mongoose = require("mongoose");
const { get } = require("../routers/router");

let
    userDetailsSchema = new mongoose.Schema({

        firstName: {
            type: String,
            required: [true, "First Name is required"]
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone Number is required"],
            match: [/^[6-9]\d{9}$/, "Please fill a valid phone number"]
        },
        profileImage: {
            type: String
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        modifiedAt: {
            type: Date,
            default: Date.now
        }

    });

let User = mongoose.model("userDetails", userDetailsSchema, 'userDetails');

class UserDetailsModel {

    create(userInfo, callback) {

        const userData = new User({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phoneNumber: userInfo.phoneNumber,
            email: userInfo.email,
            profileImage: userInfo.profileImage
        });

        userData.save((err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        })
    }

    find(email, callback) {

        User.findOne({ email: email }, (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        })
    }


    get(callback) {

        User.find({}, (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        })
    }

    update(userId, userInfo, callback) {
        User.findByIdAndUpdate(userId, {...userInfo }, { new: true }, (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        })
    }
    delete(userId, callback) {

        User.deleteOne({ _id: userId }, (err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        })
    }
}


module.exports = new UserDetailsModel();