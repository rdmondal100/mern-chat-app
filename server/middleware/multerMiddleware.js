
// import multer from 'multer'


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })


// const upload = multer({ storage: storage })



// const uploadPic = upload.single("image")

// export default  uploadPic



import multer from 'multer';

// Configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public'); 
    },
    filename: function (req, file, cb) {
        // Append a unique suffix to the file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

// Initialize multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Example: Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); 
        } else {
            cb(new Error('Only image files are allowed!'), false); 
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

// Export middleware for single file upload
export const uploadSingle = upload.single('image'); // 'profilePic' matches the field name in your frontend form

// Export middleware for multiple file uploads
export const uploadMultiple = upload.array('files', 10); // Allow up to 10 files
