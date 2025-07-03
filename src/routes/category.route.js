const express = require("express");
const { authenticate, isSeller } = require("../middleware/auth");
const { createCategory, getCategories } = require("../controller/category.controller");

const router = express.Router();
router
  .route("/")
  .get(getCategories)
  .post(authenticate, isSeller, createCategory);
// router.route("/:id").get().delete().patch()

module.exports = router;