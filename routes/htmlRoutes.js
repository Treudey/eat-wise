const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

router.get('/about', (req, res) => {
	res.sendFile(path.join(rootDir, 'views', 'about.html'));
});

router.get('/blog', (req, res) => {
	res.sendFile(path.join(rootDir, 'views', 'blog.html'));
});

router.get('/contact', (req, res) => {
	res.sendFile(path.join(rootDir, 'views', 'contact.html'));
});


module.exports = router;
