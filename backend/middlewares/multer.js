import multer from 'multer';

const storage = multer.memoryStorage(); // store in buffer
const upload = multer({ storage });

export default upload;