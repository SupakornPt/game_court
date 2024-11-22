const express = require("express")
const { createProduct, updateProduct, searchProduct, deleteProduct } = require("../controllers/MngProduct-controller")
const { authenticate } = require("../middlewares/authenticate")
const router = express.Router()

//create product
router.post("/mngproduct", createProduct) //progressing
//update product
router.put("/mngeditproduct/:id", authenticate, updateProduct) //progressing
//delete product
router.delete("/mngdeleteproduct/:id", authenticate, deleteProduct) //progressing

module.exports = router