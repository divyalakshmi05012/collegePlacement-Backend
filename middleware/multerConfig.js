import multer from 'multer';
import path from 'path';

// Define storage location and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Add timestamp to filename to avoid conflicts
    }
});

// Create multer instance
const upload = multer({ storage: storage });

export default upload;
