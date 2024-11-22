const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// const hashedPassword = bcrypt.hashSync('123456', 10)

const productCategory = [
{
    id: 1,
    name: "Abstract",
    image: "https://res.cloudinary.com/dxfryzi0g/image/upload/v1728631842/DB%20For%20CardCategory/fjysimmwuiv180pxfhfc.png",
    imageHover: "https://res.cloudinary.com/dxfryzi0g/image/upload/v1728631842/DB%20For%20CardCategory/gd27sec3ha4tyl3ljfcx.png"
}
]

console.log('DB seed...')

async function run() {
	await prisma.user.createMany({ data: userData })
}

run()
