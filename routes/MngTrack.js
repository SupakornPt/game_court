const express = require("express")
const { getOrderAll, updatePaymentStatus, createTrackingId, getTrackingAll, updateTrackingId } = require("../controllers/MngTrack-controller")
const { authenticate } = require("../middlewares/authenticate")
const router = express.Router()

//GET ORDER ALL
router.get("/getorderall", authenticate, getOrderAll) //progressing
//UPDATE STATUS
router.patch("/updatepaymentstatus", authenticate, updatePaymentStatus)
//CREATE TRACKING ID
router.post("/addtrackingid", authenticate, createTrackingId)
//GET TRACKING ALL
router.get("/gettrackingdata", authenticate, getTrackingAll)
//UPDATE TRACKING ID
router.patch("/updatetrackingid/:paymentId", authenticate, updateTrackingId)

module.exports = router