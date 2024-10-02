const express = require("express");
const router = express.Router();

const {
    loginAPI
  
} = require ("../controllers/LoginController");

router.route('/').post(loginAPI)
//router.route('/:id').get(getUserAccountById).put(updateUserAccount).delete(deleteUserAccount);

module.exports = router;