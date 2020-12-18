require("express-validator")
let
    userServices = require("../services/user"),
    expressValidator = require('express-validator');

module.exports.addNewUser = (req, res, next) => {

    try {

        // req.checkBody('firstName', 'Invalid first Name').notEmpty.isAlpha();
        // req.checkBody('lastName', 'Invalid last Name').notEmpty.isAlpha.len(4,20);
        // req.checkBody('Email', 'Invalid Email format').notEmpty.isEmail();
        // req.checkBody("phoneNumber", "Invalid phone number").isNumeric().len(10, 10);
        var imageUrl = 'http://localhost:4000/' + req.file.filename
        let filteredUserData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            profileImage: imageUrl
        }
        userServices.addNewUser(filteredUserData, (err, data) => {
            let responseObject = {}
            if (err) {
                responseObject.status = false;
                responseObject.error = err;
                responseObject.message = "User not saved"
                res.status(400).send(responseObject);
            } else {
                responseObject.status = true;
                responseObject.message = "User saved Successfully";
                res.status(201).send(responseObject);
            }
        })

    } catch (err) {
        let responseObject = {}

        if (err instanceof TypeError ||
            err instanceof SyntaxError ||
            err instanceof EvalError ||
            err instanceof RangeError ||
            err instanceof ReferenceError) {
            console.error('Programming Error: ', JSON.stringify(err));
        } else {
            consle.warn('User defined Errors: ', err);
            responseObject.status = false;
            responseObject.error = err;
            responseObject.message = "Something bad happened";
        }
        return res.status(500).send(responseObject);
    }
}

module.exports.allUsers = (req, res, next) => {

    try {

        userServices.allUsers((err, data) => {
            let responseObject = {}
            if (err) {
                responseObject.status = false;
                responseObject.error = err;
                responseObject.message = "Error while getting all users"
                res.status(400).send(responseObject);
            } else {
                responseObject.status = true;
                responseObject.message = "All Users fetched Successfully";
                responseObject.data = data;
                res.status(201).send(responseObject);
            }
        })


    } catch (err) {
        let responseObject = {};
        if (err instanceof TypeError ||
            err instanceof SyntaxError ||
            err instanceof EvalError ||
            err instanceof RangeError ||
            err instanceof ReferenceError) {
            console.error('Programming Error: ', JSON.stringify(err));
        } else {
            consle.warn('User defined Errors: ', err);
            responseObject.status = false;
            responseObject.error = err;
            responseObject.message = "Something bad happened";
        }
        return res.status(500).send(responseObject);
    }
}

module.exports.updateUser = (req, res, next) => {
    try {
        let userId = req.params.userId
        let updatedUserInfo = req.body

        userServices.updateUser(userId, updatedUserInfo, (err, data) => {
            let responseObject = {}
            if (err) {
                responseObject.status = false;
                responseObject.error = err;
                responseObject.message = "Error while Updating User"
                res.status(400).send(responseObject);
            } else {
                responseObject.status = true;
                responseObject.message = "User Updated Successfully";
                res.status(201).send(responseObject);
            }

        })
    } catch (err) {
        let responseObject = {}

        if (err instanceof TypeError ||
            err instanceof SyntaxError ||
            err instanceof EvalError ||
            err instanceof RangeError ||
            err instanceof ReferenceError) {
            console.error('Programming Error: ', JSON.stringify(err));
        } else {
            consle.warn('User defined Errors: ', err);
            responseObject.status = false;
            responseObject.error = err;
            responseObject.message = "Something bad happened";
        }
        return res.status(500).send(responseObject);
    }
}

module.exports.removeUser = (req, res, next) => {
    try {
        let userId = req.params.userId

        userServices.removeUser(userId, (err, data) => {
            let responseObject = {}
            if (err) {
                responseObject.status = false;
                responseObject.error = err;
                responseObject.message = "Error while deleting User"
                res.status(400).send(responseObject);
            } else {
                responseObject.status = true;
                responseObject.message = "User Removed Successfully";
                res.status(201).send(responseObject);
            }

        })
    } catch (err) {
        let responseObject = {}

        if (err instanceof TypeError ||
            err instanceof SyntaxError ||
            err instanceof EvalError ||
            err instanceof RangeError ||
            err instanceof ReferenceError) {
            console.error('Programming Error: ', JSON.stringify(err));
        } else {
            consle.warn('User defined Errors: ', err);
            responseObject.status = false;
            responseObject.error = err;
            responseObject.message = "Something bad happened";
        }
        return res.status(500).send(responseObject);
    }
}