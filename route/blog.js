const { Router } = require('express');
const Blog = require('../model/blog');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.resolve('./public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get('/create', (req, res) => {
    res.render('createBlog');
});

router.post('/create', upload.single('coverImage'), async (req, res) => {
    
    const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        coverImageURL: req.file ? `/uploads/${req.file.filename}` : undefined,
        createdBy: res.locals.user._id,
    });
    res.redirect(`/blog/${blog._id}`);
});

module.exports = router;