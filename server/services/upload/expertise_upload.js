const multer = require('multer')
const path = require('path')

const expertise_store = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, (path.join(__dirname, '../../public/images/expertise/expertise_main/'))) // Adjust the destination folder as needed
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    },
})

let upload_expertise = multer({ storage: expertise_store })



module.exports = upload_expertise;
