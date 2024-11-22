const express = require("express")
const { paymentByQR, createPayment, createOrder, findOrderByID, updatePayment } = require("../controllers/Payment-controller")
const { authenticate } = require("../middlewares/authenticate")
const router = express.Router()
const upload = require("../middlewares/upload")



router.post("/createorder", authenticate, createOrder) //progressing

router.get("/orderdata/:orderid", authenticate, findOrderByID)

router.get("/paymentmethod", authenticate, paymentByQR) //progressing 
router.post("/createpayment/:orderId", authenticate, upload.single("image"), createPayment) //progressing
router.patch("/updatepayment/:orderId", authenticate, upload.single("image"), updatePayment) //progressing


module.exports = router