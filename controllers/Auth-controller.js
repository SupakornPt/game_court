const bcrypt = require("bcryptjs")
const prisma = require("../config/prisma")
const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")
const registerValidator = require("../validators/registerValidator")

exports.register = async (req, res, next) => {

    try {
        const { userName, email, password, conFirmPassword } = req.body

        const rs = registerValidator(userName, email, password, conFirmPassword);

        if (rs?.status == 400) {
            createError(rs.status, rs.message)
        }
        const isUser = await prisma.user.findUnique({
            where: {
                userName: userName
            }
        })

        const isEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (isUser && isEmail) {
            return res.status(400).json({ message: "This username and email already exits." })
        }
        if (isUser) {
            return res.status(400).json({ message: "This username already exits." })
        }
        if (isEmail) {
            return res.status(400).json({ message: "This email already exits." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const newUser = await prisma.user.create({
            data: {
                userName: userName,
                email: email,
                password: hashedPassword
            }
        })
        res.json({ message: "Register success." })

    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!user) {
            return res.status(400).json({ message: "This email and password invalid." })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "This email and password invalid." })
        }
        const payload = {
            email: user.email,
            userId: user.id,
            role: user.role,
        }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" })
        res.json({ payload, token })
    } catch (err) {
        next(err)
    }
}

exports.loginadmin = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!user) {
            return res.status(400).json({ message: "This email and password invalid." })
        }
        if (user.role === "USER") {
            return res.status(400).json({ message: "Wrong role log in." })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "This email and password invalid." })
        }
        const payload = {
            email: user.email,
            userId: user.id,
            role: user.role,
        }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" })
        res.json({ payload, token })
    } catch (err) {
        next(err)
    }
}

