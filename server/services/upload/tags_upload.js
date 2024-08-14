const multer = require('multer')
const path = require('path')

const tag_store = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, (path.join(__dirname, '../../public/images/expertise/tags/'))) // Adjust the destination folder as needed
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    },
})

let upload_tag = multer({ storage: tag_store })



module.exports = upload_tag;
