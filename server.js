const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);
app.use(htmlRoutes);

// 404 page route
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

app.listen(PORT);