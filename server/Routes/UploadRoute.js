const express = require('express');
const multer = require('multer');
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');  // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);  // Use the name from the request body for the file name
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// POST route to handle file upload
router.post('/', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).json('Error uploading file');
  }
});

module.exports = router;  // Export the router to be used in other files
