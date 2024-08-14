const multer = require('multer')
const path = require('path')

const storage_personal = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, (path.join(__dirname, '../../public/images/people/personal'))) // Adjust the destination folder as needed
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    },
})

let upload_personal = multer({ storage: storage_personal })
module.exports = upload_personal;
