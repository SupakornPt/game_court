const express = require("express")
const router = express.Router()
const authController = require("../controllers/Auth-controller")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/loginadmin", authController.loginadmin)








module.exports = router