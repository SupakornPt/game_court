const prisma = require("../config/prisma")

exports.getOrderAll = async (req, res, next) => {
    try {
        const orderAllData = await prisma.order.findMany({
            where: {
                NOT: { payment: null }
            },
            include: {
                orderProductId: {
                    include: { product: true }
                },
                user: {
                    include: { address: true }
                },
                payment: true,
            }
        })
        res.status(200).json(orderAllData)
    } catch (err) {
        next(err)
    }
}

exports.updatePaymentStatus = async (req, res, next) => {
    try {

        const { id, statuspayment, isPaid, slipConfirm } = req.body
        console.log("updatestatus", id)
        const newPaymentData = await prisma.payment.update({
            where: {
                id: Number(id)
            },
            data: {
                statuspayment: statuspayment,
                isPaid: isPaid,
                slipConfirm: slipConfirm,
            }
        })
        res.status(200).json({ message: "Update payment status done." })
    } catch (err) {
        next(err)
    }
}

exports.createTrackingId = async (req, res, next) => {
    try {
        const { trackingId, paymentId, userId } = req.body
        const newTrackingId = await prisma.trackingShipment.create({
            data: {
                trackingId: trackingId,
                paymentId: Number(paymentId),
                userId: Number(userId),
            }
        })
        res.status(200).json(newTrackingId)
    } catch (err) {
        next(err)
    }
}

exports.getTrackingAll = async (req, res, next) => {
    try {
        const data = await prisma.trackingShipment.findMany({
            include: {
                payment: true
            }
        })
        console.log("data", data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

exports.updateTrackingId = async (req, res, next) => {
    try {
        console.log("params", req.params)
        console.log("body", req.body)
        const { paymentId } = req.params
        const { trackingId } = req.body
        const updateTrackingId = await prisma.trackingShipment.update({
            where: {
                paymentId: Number(paymentId)
            },
            data: {
                trackingId: trackingId
            }
        })
        res.status(200).json(updateTrackingId)
    } catch (err) {
        next(err)
    }
}