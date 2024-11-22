const express = require("express")
const { createTrack, updateTrack, showTrackAll, showOneTrack } = require("../controllers/Track-controller")
const { authenticate } = require("../middlewares/authenticate")
const router = express.Router()


router.get("/trackAll/:userId", authenticate, showTrackAll) //progressing
router.get("/searchBy/:orderId", authenticate, showOneTrack) //progressing


module.exports = router