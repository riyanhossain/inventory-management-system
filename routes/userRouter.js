const express = require('express');
const verifyJwtToken = require('../middlewares/verifyJwtToken');
const { userRegister, userLogin, userChangePassword, userUpdate, sendResetPasswordLink, userVerifyEmail } = require('../controllers/userController');

const router = express.Router();

router.post('/register', userRegister);

router.post('/login', userLogin);

router.patch('/update', verifyJwtToken, userUpdate);

router.patch('/change-password', verifyJwtToken, userChangePassword);

router.post('/reset-password', sendResetPasswordLink);

router.patch('/new-password', userVerifyEmail);

module.exports = router;
