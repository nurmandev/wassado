const express = require("express");
const router = express.Router();

const {
  getUserAccount,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
  getUserAccountById,
} = require("../controllers/UserController");

router.route("/").get(getUserAccount).post(createUserAccount);
router
  .route("/:id")
  .get(getUserAccountById)
  .put(updateUserAccount)
  .delete(deleteUserAccount);

module.exports = router;
