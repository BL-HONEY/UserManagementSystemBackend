let
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    userController = require('../controllers/user'),
    expressValidator = require('express-validator');



let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
        console.log(file);
        let filetype = '';

        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }

        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpeg';
        }
        if (file.mimetype === 'image/jpg') {
            filetype = 'jpg';
        }
        callback(null, 'image-' + Date.now() + '.' + filetype);

    }
});

let upload = multer({ storage: storage });

router.post("/users", upload.single('file'), userController.addNewUser);
router.get('/users', userController.allUsers);
router.put("/users/:userId", userController.updateUser)
router.delete("/users/:userId", userController.removeUser)





module.exports = router;