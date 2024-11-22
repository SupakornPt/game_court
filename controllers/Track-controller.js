const prisma = require("../config/prisma");


exports.showTrackAll = async (req, res, next) => {
    try {
        const { userId } = req.params
        const trackAllData = await prisma.order.findMany({
            where: {
                userId: Number(userId)
            },
            include: {
                payment: true,
            },
        })
        res.status(200).json(trackAllData)
    } catch (err) {
        next(err)
    }
}

exports.showOneTrack = async (req, res, next) => {
    try {
        const { orderId } = req.params
        console.log(req.params)
        const oneTrackData = await prisma.order.findFirst({
            where: {
                id: Number(orderId)
            },
            include: {
                payment: true,
            },
        })
        res.status(200).json(oneTrackData)
    } catch (err) {
        next(err)
    }
}