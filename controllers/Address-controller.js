const prisma = require("../config/prisma")

exports.createAddress = async (req, res, next) => {
    try {
        const { firstName, lastName, phone, addressHome, subDistrict, district, province, postal } = req.body  //waite checking
        const { userId } = req.params
        const existingPhone = await prisma.address.findUnique({
            where: {
                phone: phone,
            }
        })

        if (existingPhone) {
            return res.status(400).json({ message: "This phone number is already in use." })
        }

        const address = await prisma.address.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                addressHome: addressHome,
                subDistrict: subDistrict,
                district: district,
                province: province,
                postal: postal,
                userId: Number(userId),
            }
        })
        res.status(201).json({ message: "Address created successfully", address });
    } catch (err) {
        next(err)
    }
}
exports.getAddress = async (req, res, next) => {
    try {
        const { userId } = req.params
        const address = await prisma.address.findFirst({
            where: {
                userId: Number(userId)
            },
        })
        if (!address) {
            return res.status(200).json({ address: 'Address not found' }); // Handle not found
        }
        res.status(200).json(address)
    } catch (err) {
        next(err)
    }
}

exports.updateAddress = async (req, res, next) => {
    try {

        const { firstName, lastName, phone, addressHome, subDistrict, district, province, postal } = req.body
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        console.log(req.body)
        const updatedAddress = await prisma.address.update({
            where: {
                userId: Number(userId)
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                addressHome: addressHome,
                subDistrict: subDistrict,
                district: district,
                province: province,
                postal: postal,
            }
        })
        res.status(200).json({ message: "Address updated successfully", updatedAddress })
    } catch (err) {
        next(err)
    }
}
