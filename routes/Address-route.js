const express = require("express")
const { createAddress, updateAddress, getAddress } = require("../controllers/Address-controller")
const { authenticate } = require("../middlewares/authenticate")
const router = express.Router()


router.post("/address/:userId", authenticate, createAddress)//progressing
router.get("/address/:userId", authenticate, getAddress)//progressing
router.patch("/address/:userId", authenticate, updateAddress)//progressing



module.exports = router
