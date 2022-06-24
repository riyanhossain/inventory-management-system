const express = require('express');
const verifyJwtToken = require('../middlewares/verifyJwtToken');
const { userRegister, userLogin, userChangePassword, userUpdate, sendResetPasswordLink } = require('../controllers/userController');

const router = express.Router();

router.post('/register', userRegister);

router.post('/login', userLogin);

router.post('/update', verifyJwtToken, userUpdate);

router.post('/change-password', verifyJwtToken, userChangePassword);

router.post('/reset-password', sendResetPasswordLink);

module.exports = router;
