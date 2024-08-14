const multer = require('multer')
const path = require('path')

const storage1 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, (path.join(__dirname, '../../public/images/projects/'))) // Adjust the destination folder as needed
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    },
})

let upload = multer({ storage: storage1 })

module.exports = upload;
