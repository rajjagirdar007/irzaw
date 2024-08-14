const multer = require('multer')
const path = require('path')

const storage_leadership = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, (path.join(__dirname, '../../public/images/people/leadership/'))) // Adjust the destination folder as needed
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    },
})

let upload_leadership = multer({ storage: storage_leadership })



module.exports = upload_leadership;
