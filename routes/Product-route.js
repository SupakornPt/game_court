const express = require("express")
const router = express.Router()
const { searchText, searchFilter, searchCategory, productDetail, getAllProducts } = require("../controllers/Product-controller")
const productController = require("../controllers/Product-controller")
const { authenticate } = require("../middlewares/authenticate")
const upload = require('../middlewares/upload')


router.get("/search", searchText)
// FILTER PRODUCT
router.get("/searchbyfilter", searchFilter)
// BUTTON FIND PRODUCT
router.get("/searchbycategory/:id", searchCategory)
// GET PRODUCT DETAIL
router.get("/productdetail/:id", productDetail)
// Get all product
router.get("/getall", getAllProducts)
// Get category all
router.get("/getcategory", productController.getCategory)
// SEARCH BY PRODUCT ID
router.get("/searchbyproductid/:id", productController.searchByProductId)


router.post("/images", upload.single('image'), productController.createImage);
router.post("/removeimages", productController.removeImage);


module.exports = router
