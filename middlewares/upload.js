const path = require('path')
const multer = require('multer')

// console.log(__dirname)
// console.log(path.join(__dirname, '../upload-pic'))
// console.log(path.join(__dirname, '../pic'), "PATH")
const storage = multer.diskStorage({


	destination: (req, file, cb) => cb(null, 'C:/CC18/personal_project_api/public/'),
	filename: (req, file, cb) => {
		const id = 1
		// const fullFilename = `${id}_${Date.now()}_${Math.round(Math.random()*1000)}${path.extname(file.originalname)}`
		const fullFilename = `${id}_${Date.now()}${path.extname(file.originalname)}`
		console.log(fullFilename, "FILE")
		cb(null, fullFilename)
	}
})

module.exports = multer({ storage: storage })