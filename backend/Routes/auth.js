const express = require("express");
const router = express.Router();
const { loginUser , signUpUser} = require('../controllers/authentication');


router.post('/login', loginUser);
router.post('/signUp', signUpUser);



module.exports = router