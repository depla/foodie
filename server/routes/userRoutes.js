const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { usernameExistsCheck, emailExistsCheck, validateUserSignUp } = require('../middleware/userMiddleware');

router.post('/login', userController.login);
router.get('/login', userController.checkIfLoggedIn);

router.post('/sign-up', validateUserSignUp, usernameExistsCheck, emailExistsCheck, userController.signUp);

router.post('/logout', userController.logout);

module.exports = router;