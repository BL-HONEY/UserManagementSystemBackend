let userModel = require("../models/user");

module.exports.addNewUser = (userData, callback) => {

    userModel.find(userData.email, (err, data) => {
        if (err) {
            return callback(err, null);
        } else {
            if (data) {
                return callback("Email already exists", null);
            } else {
                userModel.create(userData, (err, data) => {
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, data);
                    }
                })
            }
        }
    })
}

module.exports.allUsers = (callback) => {

    userModel.get((err, data) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, data);
        }
    })
};

module.exports.updateUser = (userId, updatedUserInfo, callback) => {

    userModel.update(userId, updatedUserInfo, (err, data) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, data);
        }
    });
};


module.exports.removeUser = (userId, callback) => {
    userModel.delete(userId, (err, data) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, data);
        }
    })
}