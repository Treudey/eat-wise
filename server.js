const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/blog', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

app.get('/contact', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

app.listen(3000);