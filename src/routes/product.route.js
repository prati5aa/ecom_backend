const express = require("express");
const { authenticate, isSeller } = require("../middleware/auth");
const {createProduct,getProducts, getSingleProduct, deleteProduct, updateProduct,} = require("../controller/product.controller");
const upload = require("../config/multer");

const router = express.Router();
router.route("/").get(getProducts)
.post(authenticate, isSeller,upload.array("image"), createProduct);


router.route("/:id").get(getSingleProduct)

.delete(deleteProduct)


 .patch(updateProduct)

module.exports = router;